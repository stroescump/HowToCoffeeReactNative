import { DiagnoseStep } from "@/src/features/diagnose/domain/valueObjects/DiagnoseStep";

export const DIAGNOSE_STEP_CONFIG: Record<DiagnoseStep, { titleRes: string; safeAreaColor?: string; }> = {
    [DiagnoseStep.CoffeeType]: {
        titleRes: "What kind of coffee are you using?",
        safeAreaColor: "#F1E9DD",
    },
    [DiagnoseStep.Dose]: {
        titleRes: "How many \ngrams of coffee?",
        safeAreaColor: "#FC9401",
    },
    [DiagnoseStep.ExtractionDuration]: {
        titleRes: "diagnose:steps.extractionDuration.title",
        safeAreaColor: "#FF5210"
    },
    [DiagnoseStep.TasteFeedback]: {
        titleRes: "How did it taste?",
    },
    [DiagnoseStep.Recommendation]: {
        titleRes: "Your brew diagnosis",
    },
};
