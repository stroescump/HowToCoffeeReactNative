export const DiagnoseStep = {
    CoffeeRoast: "coffeeRoast",
    Dose: "dose",
    ExtractionDuration: "extractionDuration",
    Yield: "yield",
    TasteFeedback: "tasteFeedback",
    Recommendation: "recommendation"
} as const;

export type DiagnoseStep = (typeof DiagnoseStep)[keyof typeof DiagnoseStep]
