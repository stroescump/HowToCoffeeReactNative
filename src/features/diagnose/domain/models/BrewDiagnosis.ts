import { TasteArchetype } from "@/src/shared/domain/models/taste/tasteArchetype";
import { TasteProfile } from "@/src/shared/domain/models/taste/tasteProfile";
import { Recommendation } from "./Recommendation";

export type BrewDiagnosis = {
    tags: string[];
    summary: string;
    recommendations: Recommendation[];
    tasteProfile?: TasteProfile;
    tasteArchetype?: TasteArchetype;
}