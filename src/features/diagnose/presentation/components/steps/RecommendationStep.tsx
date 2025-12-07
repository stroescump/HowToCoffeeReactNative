import { StringRes } from "@/src/i18n/strings";
import { queryClient } from "@/src/shared/lib/queryClient";
import Button from "@/src/shared/ui/components/buttons/Button";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { BrewDiagnoseSession } from "../../../domain/models/BrewDiagnoseSession";
import { Recommendation } from "../../../domain/models/Recommendation";
// import { useTranslation } from "react-i18next"; // if you already use it

type Props = {
    session: BrewDiagnoseSession;
    onApplyAdvice: () => void;
};

export const RecommendationStep: React.FC<Props> = ({session, onApplyAdvice}) => {
    // const { t } = useTranslation();
    const { t } = useTranslation();
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommendations = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const brewDiagnosis = await queryClient.diagnoseShot(session);
            // sort by priority just in case
            brewDiagnosis.recommendations.sort((a, b) => a.priority - b.priority);
            setRecommendations(brewDiagnosis.recommendations);
        } catch (err: any) {
            setError(err.message ?? "Unexpected error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(session)]); // cheap-ish way to retrigger when session changes

    return (
        <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 24}}
        >
            {/* Shot summary */}
            <View style={{marginBottom: 24}}>
                <Text style={{fontSize: 24, fontWeight: "700", marginBottom: 4}}>
                    Your shot
                </Text>
                <Text style={{fontSize: 14, opacity: 0.8}}>
                    {session.doseGrams ?? "?"}g in → {session.yieldGrams ?? "?"}g out, {session.brewTimeSeconds ?? "?"}s,{" "}
                    {session.coffeeType ?? "unknown"} roast
                </Text>
                {session.tasteFeedback ? (
                    <Text style={{fontSize: 14, marginTop: 4, opacity: 0.9}}>
                        Taste feedback: “{session.tasteFeedback}”
                    </Text>
                ) : null}
            </View>

            {/* Loading */}
            {isLoading && (
                <View style={{alignItems: "center", marginTop: 32}}>
                    <ActivityIndicator/>
                    <Text style={{marginTop: 12, fontSize: 14}}>
                        Analyzing your extraction…
                    </Text>
                </View>
            )}

            {/* Error state */}
            {!isLoading && error && (
                <View style={{marginTop: 16}}>
                    <Text style={{color: "red", fontSize: 14, marginBottom: 8}}>
                        Something went wrong: {error}
                    </Text>
                    <TouchableOpacity
                        onPress={fetchRecommendations}
                        style={{
                            alignSelf: "flex-start",
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            borderRadius: 999,
                            borderWidth: 1,
                            borderColor: "#333",
                        }}
                    >
                        <Text style={{fontSize: 14, fontWeight: "600"}}>Try again</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Recommendations list */}
            {!isLoading && !error && recommendations.length > 0 && (
                <View style={{marginTop: 8}}>
                    <Text style={{fontSize: 20, fontWeight: "700", marginBottom: 12}}>
                        Coach’s suggestion
                    </Text>

                    <FlatList
                        data={recommendations}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({item, index}) => (
                            <RecommendationCard
                                recommendation={item}
                                isPrimary={index === 0}
                            />
                        )}
                    />
                    <Button
                        className="mt-4"
                        text={t(StringRes.steps.recommendation.applyAdvice)}
                        onPress={onApplyAdvice}
                    />
                </View>
            )}

            {!isLoading && !error && recommendations.length === 0 && (
                <Text style={{marginTop: 16, fontSize: 14, opacity: 0.8}}>
                    No recommendations yet. Adjust your inputs and try again.
                </Text>
            )}
        </ScrollView>
    );
};

type CardProps = {
    recommendation: Recommendation;
    isPrimary?: boolean;
};

const RecommendationCard: React.FC<CardProps> = ({recommendation, isPrimary}) => {
    return (
        <View
            style={{
                marginBottom: 16,
                padding: 16,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#111",
                backgroundColor: isPrimary ? "#FFF7E6" : "#FFFFFF",
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowOffset: {width: 0, height: 4},
                shadowRadius: 8,
                elevation: 2,
            }}
        >
            {isPrimary && (
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: "600",
                        marginBottom: 6,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                    }}
                >
                    Most impactful change
                </Text>
            )}
            <Text style={{fontSize: 18, fontWeight: "700", marginBottom: 4}}>
                {recommendation.title}
            </Text>
            <Text style={{fontSize: 14, lineHeight: 20}}>
                {recommendation.description}
            </Text>
        </View>
    );
};
