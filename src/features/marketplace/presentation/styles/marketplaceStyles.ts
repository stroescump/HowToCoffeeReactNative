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
  dropdownMenu: {
    marginTop: 8,
    backgroundColor: PALETTE.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingVertical: 6,
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  dropdownItemActive: {
    backgroundColor: PALETTE.filterBg,
  },
  dropdownText: {
    fontSize: 13,
    color: PALETTE.textPrimary,
    fontWeight: "600",
  },
  dropdownTextActive: {
    color: PALETTE.textPrimary,
  },
  listContent: {
    paddingBottom: SPACING * 3,
  },
  listSeparator: {
    height: ITEM_SPACING,
  },
  footerLoading: {
    paddingVertical: SPACING * 2,
    alignItems: "center",
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
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 4,
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
    marginRight: 6,
  },
  roastBadge: {
    alignSelf: "flex-start",
    backgroundColor: PALETTE.filterBg,
    color: PALETTE.filterText,
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
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
  cardFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: PALETTE.textPrimary,
  },
  ctaPill: {
    backgroundColor: PALETTE.accent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ctaPillDisabled: {
    backgroundColor: PALETTE.border,
  },
  ctaText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  ctaTextDisabled: {
    color: PALETTE.textMuted,
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
  detailContainer: {
    flex: 1,
  },
  detailImage: {
    width: "100%",
    height: 260,
    borderRadius: 22,
    marginBottom: SPACING,
    backgroundColor: PALETTE.imageBg,
  },
  detailHeader: {
    marginBottom: SPACING,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: PALETTE.textPrimary,
    marginBottom: 6,
  },
  detailSubtitle: {
    fontSize: 14,
    color: PALETTE.textMuted,
    marginBottom: 8,
  },
  detailBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  detailMeta: {
    fontSize: 12,
    color: PALETTE.textMuted,
    marginLeft: 6,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: PALETTE.textPrimary,
  },
  detailAvailability: {
    fontSize: 12,
    fontWeight: "600",
    color: PALETTE.textMuted,
  },
});
