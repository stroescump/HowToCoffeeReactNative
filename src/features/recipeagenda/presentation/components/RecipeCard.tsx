import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BrewRecipe } from "../../domain/models/recipeAgenda";
import { ACCENT_COLORS, PALETTE, styles } from "../screens/RecipeAgendaStyles";

type CardProps = {
    recipe: BrewRecipe;
    accentIndex: number;
    onPress?: () => void;
};

export const RecipeCard: React.FC<CardProps> = ({ recipe, accentIndex, onPress }) => {
    const accent = ACCENT_COLORS[accentIndex % ACCENT_COLORS.length];

    const minutes = Math.floor(recipe.brewTimeSeconds / 60);
    const seconds = recipe.brewTimeSeconds % 60;
    const timeLabel =
        minutes > 0 ? `${minutes}m ${seconds.toString().padStart(2, "0")}s` : `${seconds}s`;

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.card}>
                {/* Left block: name + meta */}
                <View style={styles.cardLeft}>
                    <Text numberOfLines={1} style={styles.recipeName}>
                        {recipe.name}
                    </Text>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Dose</Text>
                        <Text style={styles.metaValue}>{recipe.doseGrams.toFixed(0)} g</Text>
                    </View>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Yield</Text>
                        <Text style={styles.metaValue}>{recipe.yieldGrams.toFixed(0)} g</Text>
                    </View>

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Time</Text>
                        <Text style={styles.metaValue}>{timeLabel}</Text>
                    </View>

                    {recipe.temperatureCelsius != null && (
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>Temp</Text>
                            <Text style={styles.metaValue}>
                                {recipe.temperatureCelsius.toFixed(0)}°C
                            </Text>
                        </View>
                    )}

                    {recipe.grinderModel && (
                        <Text numberOfLines={1} style={styles.metaFootnote}>
                            {recipe.grinderModel}
                            {recipe.grindSetting ? ` · ${recipe.grindSetting}` : ""}
                        </Text>
                    )}
                </View>

                {/* Right block: bold brutalist metric grid */}
                <View style={styles.cardRight}>
                    <View style={[styles.metricBlockTop, { backgroundColor: accent }]}>
                        <Text style={styles.metricLabel}>Ratio</Text>
                        <Text style={styles.metricBig}>
                            {getRatio(recipe.doseGrams, recipe.yieldGrams)}
                        </Text>
                    </View>

                    <View style={styles.metricRow}>
                        <View style={styles.metricBlockBottomLeft}>
                            <Text style={styles.metricLabel}>Time</Text>
                            <Text style={styles.metricMedium}>{timeLabel}</Text>
                        </View>
                        <View style={[styles.metricBlockBottomRight, { backgroundColor: PALETTE.cardBlack }]}>
                            <Text style={styles.metricLabelLight}>Dose</Text>
                            <Text style={styles.metricMediumLight}>
                                {recipe.doseGrams.toFixed(0)} g
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {recipe.notes && (
                <Text numberOfLines={2} style={styles.notes}>
                    {recipe.notes}
                </Text>
            )}
        </TouchableOpacity>
    );
};

// ---- helpers ----

function getRatio(dose: number, yieldGrams: number): string {
    if (!dose || !yieldGrams) return "–";
    const ratio = yieldGrams / dose;
    return `1:${ratio.toFixed(1)}`;
}