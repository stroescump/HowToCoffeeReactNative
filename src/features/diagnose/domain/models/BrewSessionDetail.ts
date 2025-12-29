import type { CoffeeRoast } from "./CoffeeRoast";
import type { Recommendation } from "./Recommendation";
import type { TasteFeedback } from "./TasteFeedback";

export type BrewSessionAiResult = {
  diagnoseDetails?: {
    tags: string[];
    summary: string;
    recommendations: Recommendation[];
  };
  modelId?: string;
  promptVersion?: number;
  createdAtMillis?: number;
  latencyMs?: number;
};

export type BrewSessionShot = {
  id: string;
  timestampMillis: number;
  doseGrams: number | null;
  yieldGrams: number | null;
  brewTimeSeconds: number | null;
  temperatureCelsius: number | null;
  tasteFeedback: TasteFeedback | null;
  grinderModel?: string | null;
  grindSetting?: string | null;
  aiResult?: BrewSessionAiResult | null;
};

export type BrewSessionDetail = {
  id: string;
  coffeeProductId?: string | null;
  coffeeDisplayName?: string | null;
  coffeeRoast?: CoffeeRoast | null;
  shopName?: string | null;
  shots: BrewSessionShot[];
  markedAsSuccessful: boolean;
  createdAtMillis: number;
  updatedAtMillis: number;
};
