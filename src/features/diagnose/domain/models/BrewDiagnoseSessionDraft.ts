import { BrewMethod } from "@/src/shared/domain/models/BrewMethod";
import { CoffeeType } from "./CoffeeType";
import { TasteFeedback } from "./TasteFeedback";

export type BrewDiagnoseSessionDraft = {
  id?: string;

  // What coffee is being dialed in
  coffeeProductId?: string;   // If linked to a known product (marketplace or saved)
  coffeeDisplayName?: string; // If user picked a coffee manually (“El Paraiso Pink Bourbon”)
  shopName?: string;          // Optional, for future crawling / metadata extraction
  coffeeType?: CoffeeType;
  tasteFeedback?: TasteFeedback;
  brewMethod?: BrewMethod
  // Current brew parameters (the ones user changes as they iterate)
  doseGrams?: number;
  yieldGrams?: number;
  brewTimeSeconds?: number;
  temperatureCelsius?: number;

  grinderModel?: string;
  grindSetting?: string;

  // Diagnosis results from backend (optional)
  lastDiagnosis?: {
    tags: string[];
    summary: string;
    recommendation: {
      id: string;
      label: string;
      description: string;
    };
  };

  // Whether user marked the current shot as great (“Now it tastes amazing!”)
  markedAsSuccessful?: boolean;

  // For future: multi-shot tracking
  history?: Array<{
    timestamp: number;
    doseGrams: number;
    yieldGrams: number;
    brewTimeSeconds: number;
    temperatureCelsius?: number;
  }>;
};

export type BrewDiagnoseSessionSummary = {
  id: string;
  coffeeProductId?: string;
  coffeeDisplayName?: string;
  shotCount: number;
  markedAsSuccessful: boolean;
  updatedAtMillis: number;
}
