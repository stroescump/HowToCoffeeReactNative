import { TasteArchetype } from "@/src/shared/domain/taste/tasteArchetype";
import { TasteProfile } from "@/src/shared/domain/taste/tasteProfile";
import { DiagnosisBlock } from "./DiagnosisBlock";
import { Recommendation } from "./Recommendation";

export type BrewDiagnosis = {
    coreDiagnosis: CoreDiagnosis;
    tasteArchetype?: TasteArchetype;
    tasteProfile?: TasteProfile;
}

export type CoreDiagnosis = {
    diagnosis: DiagnosisBlock;
    recommendations: Recommendation[];
    modelId: string;
    promptVersion: number;
    createdAtMillis: number
    latencyMs: number | null;
}