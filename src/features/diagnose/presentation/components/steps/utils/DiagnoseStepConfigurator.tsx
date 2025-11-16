import { DiagnoseStep } from "@/src/features/diagnose/domain/valueObjects/DiagnoseStep";

export const DiagnoseStepConfigurator: Record<DiagnoseStep, { titleRes: string; safeAreaColor?: string; }> = {
    [DiagnoseStep.CoffeeType]: {
        titleRes: "diagnose:steps.coffeeType.title",
        safeAreaColor: "#F1E9DD",
    },
    [DiagnoseStep.Dose]: {
        titleRes: "diagnose:steps.dose.title",
        safeAreaColor: "#FC9401",
    },
    [DiagnoseStep.ExtractionDuration]: {
        titleRes: "diagnose:steps.extractionDuration.title",
        safeAreaColor: "#FF5210"
    },
    [DiagnoseStep.TasteFeedback]: {
        titleRes: "diagnose:steps.tasteFeedback.title",
    },
    [DiagnoseStep.Recommendation]: {
        titleRes: "diagnose:steps.recommendation.title",
    },
};
