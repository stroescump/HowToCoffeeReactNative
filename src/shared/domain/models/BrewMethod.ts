export const BrewMethod = {
    ESPRESSO: "ESPRESSO",
    FILTER: "FILTER"
} as const;

export type BrewMethod = (typeof BrewMethod)[keyof typeof BrewMethod]