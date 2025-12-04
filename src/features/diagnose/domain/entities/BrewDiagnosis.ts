import { TasteArchetype } from "@/src/shared/domain/taste/tasteArchetype";
import { TasteProfile } from "@/src/shared/domain/taste/tasteProfile";
import { DiagnosisBlock } from "./DiagnosisBlock";
import { Recommendation } from "./Recommendation";

export type BrewDiagnosis = {
    diagnosis: DiagnosisBlock;
    recommendations: Recommendation[];
    modelId: string;
    promptVersion: number;
    createdAtMillis: number
    latencyMs: number | null;
    tasteArchetype?: TasteArchetype;
    tasteProfile?: TasteProfile;
}