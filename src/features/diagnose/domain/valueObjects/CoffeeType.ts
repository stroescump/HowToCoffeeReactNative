export const CoffeeType = {
    MediumRoast: "mediumRoast",
    LightRoast: "lightRoast",
    DarkRoast: "darkRoast",
    Unknown: "unknown"
} as const;

export type CoffeeType = (typeof CoffeeType)[keyof typeof CoffeeType];