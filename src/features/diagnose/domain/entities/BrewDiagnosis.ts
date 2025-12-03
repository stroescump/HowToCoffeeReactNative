import { DiagnosisBlock } from "./DiagnosisBlock";
import { Recommendation } from "./Recommendation";

export type BrewDiagnosis = {
    diagnosis: DiagnosisBlock;
    recommendations: Recommendation[];
    modelId: string;
    promptVersion: number;
    createdAtMillis: number
    latencyMs: number | null;
}