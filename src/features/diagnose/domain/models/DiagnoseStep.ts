export const DiagnoseStep = {
    CoffeeType: "coffeeType",
    Dose: "dose",
    ExtractionDuration: "extractionDuration",
    Yield: "yield",
    TasteFeedback: "tasteFeedback",
    Recommendation: "recommendation"
} as const;

export type DiagnoseStep = (typeof DiagnoseStep)[keyof typeof DiagnoseStep]
