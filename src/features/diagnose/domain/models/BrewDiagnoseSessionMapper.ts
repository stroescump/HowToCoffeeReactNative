import { BrewDiagnoseSession } from "./BrewDiagnoseSession";
import { BrewDiagnoseSessionDraft } from "./BrewDiagnoseSessionDraft";

export class BrewDiagnoseSessionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BrewDiagnoseSessionError";
  }
}

export function isSessionCompleteOrThrow(
  draft: BrewDiagnoseSessionDraft
): BrewDiagnoseSession {
  const {
    id,
    coffeeDisplayName,
    coffeeType,
    tasteFeedback,
    brewMethod,
    doseGrams,
    yieldGrams,
    brewTimeSeconds,
    grindSetting,
  } = draft;

  if (!coffeeType) {
    throw new BrewDiagnoseSessionError("Missing coffeeType");
  }
  if (!tasteFeedback) {
    throw new BrewDiagnoseSessionError("Missing tasteFeedback");
  }
  if (!brewMethod) {
    throw new BrewDiagnoseSessionError("Missing brewMethod");
  }
  if (doseGrams == null) {
    throw new BrewDiagnoseSessionError("Missing doseGrams");
  }
  if (yieldGrams == null) {
    throw new BrewDiagnoseSessionError("Missing yieldGrams");
  }
  if (brewTimeSeconds == null) {
    throw new BrewDiagnoseSessionError("Missing brewTimeSeconds");
  }

  const result: BrewDiagnoseSession = {
    coffeeDisplayName,
    coffeeType,
    tasteFeedback,
    brewMethod,
    doseGrams,
    yieldGrams,
    brewTimeSeconds,
    grindSetting,
    markedAsSuccessful: draft.markedAsSuccessful ?? false,
    history: draft.history ?? [],
    id: id
  };

  if (draft.coffeeProductId != null) {
    result.coffeeProductId = draft.coffeeProductId;
  }

  if (draft.shopName != null) {
    result.shopName = draft.shopName;
  }

  if (draft.temperatureCelsius != null) {
    result.temperatureCelsius = draft.temperatureCelsius;
  }

  if (draft.grinderModel != null) {
    result.grinderModel = draft.grinderModel;
  }

  if (draft.lastDiagnosis != null) {
    result.lastDiagnosis = draft.lastDiagnosis;
  }

  return result;
}

export function hasValidIdOrThrow(
  session: BrewDiagnoseSession
): string {
  if (!session.id) {
    throw new BrewDiagnoseSessionError("Missing session id");
  }
  return session.id;
}