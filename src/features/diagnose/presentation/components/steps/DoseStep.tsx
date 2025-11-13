import React, { useEffect, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type DoseStepProps = {
    doseGrams: number;
    hasScale: boolean;
    onSubmit: (doseGrams: number, hasScale: boolean) => void;
    onBack: () => void;
};

export const DoseStep = ({
    doseGrams,
    hasScale,
    onSubmit,
    onBack,
}: DoseStepProps) => {
    const [doseInput, setDoseInput] = useState(
        doseGrams != null ? String(doseGrams) : "",
    );
    const [localHasScale, setLocalHasScale] = useState(hasScale);

    useEffect(() => {
        setDoseInput(doseGrams != null ? String(doseGrams) : "");
    }, [doseGrams]);

    useEffect(() => {
        setLocalHasScale(hasScale);
    }, [hasScale]);

    const parsedDose = useMemo(() => Number(doseInput), [doseInput]);
    const canSubmit = !Number.isNaN(parsedDose) && parsedDose > 0;

    function handleSubmit() {
        if (!canSubmit) return;
        onSubmit(parsedDose, localHasScale);
    }

    return (
        <View className="flex-1 justify-between">
            <View className="gap-6">
                <View>
                    <Text className="text-2xl font-semibold text-white">
                        Dose
                    </Text>
                    <Text className="mt-1 text-base text-blue-100">
                        Let us know how much coffee you are using.
                    </Text>
                </View>

                <View>
                    <Text className="mb-2 text-sm uppercase tracking-wide text-blue-100">
                        Dose (grams)
                    </Text>
                    <TextInput
                        keyboardType="numeric"
                        value={doseInput}
                        onChangeText={setDoseInput}
                        placeholder="18"
                        placeholderTextColor="#94a3b8"
                        className="rounded-xl bg-white/10 px-4 py-3 text-lg text-white"
                    />
                </View>

                <View>
                    <Text className="mb-2 text-sm uppercase tracking-wide text-blue-100">
                        Do you have a scale?
                    </Text>
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            className={`flex-1 rounded-xl px-4 py-3 ${localHasScale ? "bg-white" : "border border-white/30"
                                }`}
                            onPress={() => setLocalHasScale(true)}
                        >
                            <Text
                                className={`text-center text-base font-medium ${localHasScale ? "text-blue-700" : "text-white"
                                    }`}
                            >
                                Yes
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`flex-1 rounded-xl px-4 py-3 ${!localHasScale ? "bg-white" : "border border-white/30"
                                }`}
                            onPress={() => setLocalHasScale(false)}
                        >
                            <Text
                                className={`text-center text-base font-medium ${!localHasScale ? "text-blue-700" : "text-white"
                                    }`}
                            >
                                No
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className="flex-row gap-4">
                <TouchableOpacity
                    onPress={onBack}
                    className="flex-1 rounded-xl border border-white/40 py-3"
                >
                    <Text className="text-center text-base font-semibold text-white">
                        Back
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!canSubmit}
                    className={`flex-1 rounded-xl py-3 ${canSubmit ? "bg-white" : "bg-white/30"
                        }`}
                >
                    <Text
                        className={`text-center text-base font-semibold ${canSubmit ? "text-blue-700" : "text-blue-200"
                            }`}
                    >
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
