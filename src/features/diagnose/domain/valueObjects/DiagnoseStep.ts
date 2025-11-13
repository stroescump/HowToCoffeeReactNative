
export const DiagnoseStep = {
    CoffeeType: "coffeeType",
    Dose: "dose",
    Time: "time",
    Taste: "taste",
    Recommendation: "recommendation"
} as const;

export type DiagnoseStep = (typeof DiagnoseStep)[keyof typeof DiagnoseStep]
