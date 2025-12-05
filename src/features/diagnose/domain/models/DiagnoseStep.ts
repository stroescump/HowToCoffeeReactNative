
export const DiagnoseStep = {
    CoffeeType: "coffeeType",
    Dose: "dose",
    ExtractionDuration: "extractionDuration",
    TasteFeedback: "tasteFeedback",
    Recommendation: "recommendation"
} as const;

export type DiagnoseStep = (typeof DiagnoseStep)[keyof typeof DiagnoseStep]
