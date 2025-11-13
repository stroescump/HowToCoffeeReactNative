
export const TasteFeedback = {
    Sour: "sour",
    Bitter: "bitter",
    Acidic: "acidic",
    Watery: "watery",
} as const;

export type TasteFeedback = (typeof TasteFeedback)[keyof typeof TasteFeedback];
