import { StyleSheet } from "react-native";

export const SPACING = 12;

export const PALETTE = {
  background: "#F6F1EA",
  card: "#FFFFFF",
  textPrimary: "#1F1B16",
  textMuted: "#6F645B",
  border: "#E6DED3",
  tagBg: "#F1E6D8",
  tagText: "#4B3D32",
  accent: "#B34B1E",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.background,
    paddingHorizontal: SPACING * 2,
    paddingBottom: SPACING * 2,
  },
  listContent: {
    paddingBottom: SPACING * 3,
    flexGrow: 1,
  },
  card: {
    backgroundColor: PALETTE.card,
    borderRadius: 20,
    padding: SPACING * 2,
    borderWidth: 1,
    borderColor: PALETTE.border,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: PALETTE.textPrimary,
    paddingRight: SPACING,
  },
  cardDistance: {
    fontSize: 12,
    fontWeight: "600",
    color: PALETTE.textMuted,
  },
  cardAddress: {
    marginTop: SPACING,
    fontSize: 14,
    color: PALETTE.textMuted,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACING,
  },
  filtersRow: {
    flexDirection: "row",
    marginBottom: SPACING,
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: PALETTE.tagBg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    marginRight: SPACING / 2,
  },
  filterPillActive: {
    backgroundColor: PALETTE.accent,
    borderColor: PALETTE.accent,
  },
  filterText: {
    color: PALETTE.tagText,
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: PALETTE.tagBg,
    marginRight: SPACING / 2,
    marginBottom: SPACING / 2,
  },
  tagPillAccent: {
    backgroundColor: PALETTE.accent,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: PALETTE.tagText,
  },
  tagTextAccent: {
    color: "#FFFFFF",
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING * 2,
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: PALETTE.textPrimary,
    textAlign: "center",
    marginBottom: SPACING,
  },
  stateBody: {
    fontSize: 14,
    color: PALETTE.textMuted,
    textAlign: "center",
    marginBottom: SPACING * 2,
  },
  errorText: {
    fontSize: 13,
    color: "#9B1C1C",
    textAlign: "center",
    marginBottom: SPACING,
  },
  actionButton: {
    backgroundColor: PALETTE.accent,
    paddingVertical: SPACING,
    paddingHorizontal: SPACING * 2,
    borderRadius: 999,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
