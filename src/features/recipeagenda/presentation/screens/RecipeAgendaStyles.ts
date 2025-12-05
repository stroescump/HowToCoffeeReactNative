// src/features/recipeagenda/presentation/screens/RecipeAgendaStyles.ts
import { StyleSheet } from "react-native";

export const SPACING = 8;

export const PALETTE = {
    background: "#050506",
    cream: "#F5E7D5",
    orange: "#FF7A00",
    yellow: "#FFD400",
    cyan: "#00F0FF",
    lime: "#3BFF5E",
    textPrimary: "#F9F4EC",
    textMuted: "#C1BBB2",
    cardBlack: "#111111",
};

export const ACCENT_COLORS = [PALETTE.orange, PALETTE.cyan, PALETTE.yellow, PALETTE.lime];

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PALETTE.background,
        paddingHorizontal: SPACING * 2,
        paddingTop: SPACING * 2,
        paddingBottom: SPACING * 4,
    },

    header: {
        marginBottom: SPACING * 3,
    },

    kicker: {
        fontSize: 12,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: PALETTE.textMuted,
        marginBottom: SPACING,
    },

    title: {
        fontSize: 32,
        lineHeight: 36,
        fontWeight: "700",
        color: PALETTE.textPrimary,
        marginBottom: SPACING,
    },

    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: PALETTE.textMuted,
        maxWidth: 260,
    },

    listContent: {
        paddingBottom: SPACING * 4,
    },

    card: {
        flexDirection: "row",
        backgroundColor: PALETTE.cardBlack,
        borderRadius: 32, // deliberate exception from strict 8px
        padding: SPACING * 2,
        overflow: "hidden",
    },

    cardLeft: {
        flex: 1.2,
        paddingRight: SPACING * 2,
    },

    cardRight: {
        flex: 1,
        justifyContent: "space-between",
    },

    recipeName: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "700",
        color: PALETTE.cream,
        marginBottom: SPACING * 2,
    },

    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: SPACING,
    },

    metaLabel: {
        fontSize: 12,
        letterSpacing: 1,
        textTransform: "uppercase",
        color: PALETTE.textMuted,
    },

    metaValue: {
        fontSize: 14,
        fontWeight: "600",
        color: PALETTE.textPrimary,
    },

    metaFootnote: {
        fontSize: 12,
        color: PALETTE.textMuted,
        marginTop: SPACING * 2,
    },

    metricBlockTop: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 24,
        paddingHorizontal: SPACING * 2,
        paddingVertical: SPACING * 2,
        justifyContent: "space-between",
    },

    metricRow: {
        flexDirection: "row",
        marginTop: SPACING * 1.5,
    },

    metricBlockBottomLeft: {
        flex: 1,
        backgroundColor: PALETTE.cream,
        borderBottomLeftRadius: 24,
        paddingHorizontal: SPACING * 2,
        paddingVertical: SPACING * 2,
        justifyContent: "space-between",
        marginRight: SPACING,
    },

    metricBlockBottomRight: {
        flex: 1,
        borderBottomRightRadius: 24,
        paddingHorizontal: SPACING * 2,
        paddingVertical: SPACING * 2,
        justifyContent: "space-between",
        marginLeft: SPACING,
    },

    metricLabel: {
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "#141414",
    },

    metricBig: {
        fontSize: 28,
        lineHeight: 30,
        fontWeight: "800",
        color: "#141414",
    },

    metricMedium: {
        fontSize: 16,
        fontWeight: "700",
        color: "#141414",
    },

    metricLabelLight: {
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: PALETTE.textMuted,
    },

    metricMediumLight: {
        fontSize: 16,
        fontWeight: "700",
        color: PALETTE.textPrimary,
    },

    notes: {
        marginTop: SPACING,
        fontSize: 12,
        lineHeight: 16,
        color: PALETTE.textMuted,
        paddingHorizontal: SPACING * 0.5,
    },
});