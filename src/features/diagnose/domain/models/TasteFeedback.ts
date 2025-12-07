
export const TasteFeedback = {
    Sour: "SOUR",
    Bitter: "BITTER",
    Acidic: "ACIDIC",
    Watery: "WATERY",
    NoCoffee: "NO_COFFEE",
} as const;

export type TasteFeedback = (typeof TasteFeedback)[keyof typeof TasteFeedback];
