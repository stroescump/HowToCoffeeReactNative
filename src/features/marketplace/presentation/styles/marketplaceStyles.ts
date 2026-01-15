import { StyleSheet } from "react-native";

export const SPACING = 12;
export const ITEM_SPACING = 8;
export const CARD_IMAGE_WIDTH = 96;
export const CARD_IMAGE_HEIGHT = 140;
export const CARD_BODY_PADDING = 8;

export const PALETTE = {
  background: "#F4EEE6",
  card: "#FFFFFF",
  textPrimary: "#2A1F16",
  textMuted: "#6F6257",
  border: "#E3D8CD",
  accent: "#C36A2D",
  filterBg: "#EFE4D7",
  filterText: "#3E2F24",
  imageBg: "#E8DDD1",
  badgeBg: "#2A1F16",
  badgeText: "#FFFFFF",
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PALETTE.background,
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING,
    paddingBottom: SPACING * 2,
  },
  filtersRow: {
    flexDirection: "row",
    marginBottom: SPACING,
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: PALETTE.filterBg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    marginRight: SPACING / 2,
  },
  filterPillActive: {
    backgroundColor: PALETTE.accent,
    borderColor: PALETTE.accent,
  },
  filterText: {
    color: PALETTE.filterText,
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: SPACING * 3,
  },
  listSeparator: {
    height: ITEM_SPACING,
  },
  card: {
    flexDirection: "row",
    backgroundColor: PALETTE.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: PALETTE.border,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardImage: {
    width: CARD_IMAGE_WIDTH,
    height: CARD_IMAGE_HEIGHT,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    backgroundColor: PALETTE.imageBg,
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: PALETTE.textMuted,
  },
  cardBody: {
    flex: 1,
    padding: CARD_BODY_PADDING,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: PALETTE.badgeBg,
    color: PALETTE.badgeText,
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: PALETTE.textPrimary,
    marginBottom: 4,
  },
  cardShop: {
    fontSize: 13,
    color: PALETTE.textMuted,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 12,
    color: PALETTE.textMuted,
    marginBottom: 2,
  },
  cardNotes: {
    fontSize: 12,
    color: PALETTE.textPrimary,
    marginTop: 4,
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING * 3,
  },
  stateText: {
    fontSize: 14,
    color: PALETTE.textMuted,
  },
  errorText: {
    fontSize: 13,
    color: "#9B1C1C",
    textAlign: "center",
    marginBottom: SPACING,
  },
});
