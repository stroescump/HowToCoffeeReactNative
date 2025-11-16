import { DiagnoseStep } from "@/src/features/diagnose/domain/valueObjects/DiagnoseStep";

export const DIAGNOSE_STEP_CONFIG: Record<DiagnoseStep, { title: string; safeAreaColor?: string; }> = {
    [DiagnoseStep.CoffeeType]: {
        title: "What kind of coffee are you using?",
        safeAreaColor: "#F1E9DD",
    },
    [DiagnoseStep.Dose]: {
        title: "How many \ngrams of coffee?",
        safeAreaColor: "#FC9401",
    },
    [DiagnoseStep.ExtractionDuration]: {
        title: "How long was the extraction?",
        safeAreaColor: "#FF5210"
    },
    [DiagnoseStep.TasteFeedback]: {
        title: "How did it taste?",
    },
    [DiagnoseStep.Recommendation]: {
        title: "Your brew diagnosis",
    },
};
