import { BrewMethod } from "@/src/shared/domain/models/BrewMethod";
import { isUserAuthenticated } from "@/src/shared/domain/usecases/authStatusUseCase";
import { queryClient } from "@/src/shared/lib/queryClient";
import { useCallback, useEffect, useState } from "react";
import type { BrewDiagnoseSessionDraft } from "../../domain/models/BrewDiagnoseSessionDraft";
import type { BrewDiagnoseSessionSummary } from "../../domain/models/BrewDiagnoseSessionDraft";
import type { BrewSessionDetail, BrewSessionShot } from "../../domain/models/BrewSessionDetail";
import type { DiagnoseArchiveEntry } from "../../domain/models/DiagnoseArchiveEntry";
import type { DiagnoseFlowState, DiagnoseResumeTarget } from "../../domain/models/DiagnoseFlowState";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import { getResumeStep } from "../../domain/usecases/GetResumeStep";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import type { Recommendation } from "../../domain/models/Recommendation";

type PendingSource = "local" | "backend";

type PendingCandidate =
  | {
      source: "local";
      state: DiagnoseFlowState;
      updatedAtMillis: number;
    }
  | {
      source: "backend";
      summary: BrewDiagnoseSessionSummary;
      updatedAtMillis: number;
    };

type PendingSnapshot = {
  candidate: PendingCandidate | null;
  pendingCount: number;
};

interface UsePendingDiagnoseSessionDeps {
  draftRepository: DiagnoseRepository;
}

export function usePendingDiagnoseSession({ draftRepository }: UsePendingDiagnoseSessionDeps) {
  const [snapshot, setSnapshot] = useState<PendingSnapshot>({
    candidate: null,
    pendingCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const [localDraft, archived, finalized] = await Promise.all([
        draftRepository.loadDraft(),
        draftRepository.loadArchive(),
        draftRepository.loadFinalizedSessionIds(),
      ]);

      const finalizedIds = new Set<string>(finalized);
      archived.forEach((entry) => {
        const id = entry.state.session.id;
        if (id) finalizedIds.add(id);
      });

      const localCandidate = buildLocalCandidate(localDraft, finalizedIds);

      const backendCandidates = await loadBackendCandidates(finalizedIds, localDraft);

      const candidate = pickCandidate(localCandidate, backendCandidates);
      setSnapshot({
        candidate,
        pendingCount: candidate ? 1 : 0,
      });
      return candidate;
    } catch {
      setSnapshot({
        candidate: null,
        pendingCount: 0,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [draftRepository]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const continueSession = useCallback(async (): Promise<DiagnoseResumeTarget | null> => {
    if (!snapshot.candidate) return null;

    if (snapshot.candidate.source === "local") {
      return snapshot.candidate.state.resumeTarget;
    }

    const sessionId = snapshot.candidate.summary.id ?? snapshot.candidate.summary.sessionId;
    if (!sessionId) {
      return null;
    }

    const detail = await queryClient.fetchBrewSessionById(sessionId);
    const nextState = buildDraftFromBackend(detail);
    await draftRepository.saveDraft(nextState);
    return nextState.resumeTarget;
  }, [draftRepository, snapshot.candidate]);

  const discardSession = useCallback(
    async () => {
      if (!snapshot.candidate) return;

      let entry: DiagnoseArchiveEntry | null = null;

      if (snapshot.candidate.source === "local") {
        entry = buildArchiveEntry(snapshot.candidate.state, "discarded");
      } else {
        const sessionId = snapshot.candidate.summary.id ?? snapshot.candidate.summary.sessionId;
        if (sessionId) {
          try {
            const detail = await queryClient.fetchBrewSessionById(sessionId);
            entry = buildArchiveEntry(buildDraftFromBackend(detail), "discarded");
          } catch {
            entry = buildArchiveEntry(
              buildDraftFromSummary(snapshot.candidate.summary),
              "discarded",
            );
          }
        }
      }

      if (entry) {
        await draftRepository.appendArchive(entry);
        if (entry.state.session.id) {
          await draftRepository.addFinalizedSessionId(entry.state.session.id);
        }
      }

      await draftRepository.clearDraft();
      await refresh();
    },
    [draftRepository, refresh, snapshot.candidate],
  );

  return {
    candidate: snapshot.candidate,
    pendingCount: snapshot.pendingCount,
    isLoading,
    refresh,
    continueSession,
    discardSession,
  };
}

function buildLocalCandidate(
  localDraft: DiagnoseFlowState | null,
  finalizedIds: Set<string>,
): PendingCandidate | null {
  if (!localDraft) return null;

  const localId = localDraft.session.id;
  if (localId && finalizedIds.has(localId)) {
    return null;
  }

  return {
    source: "local",
    state: localDraft,
    updatedAtMillis: localDraft.updatedAtMillis ?? localDraft.createdAtMillis ?? 0,
  };
}

async function loadBackendCandidates(
  finalizedIds: Set<string>,
  localDraft: DiagnoseFlowState | null,
): Promise<PendingCandidate[]> {
  const isAuthenticated = await isUserAuthenticated();
  if (!isAuthenticated) return [];

  let summaries: BrewDiagnoseSessionSummary[] = [];
  try {
    summaries = await queryClient.fetchBrewSessions();
  } catch {
    return [];
  }

  const localId = localDraft?.session.id;

  return summaries
    .filter((summary) => {
      const id = summary.id ?? summary.sessionId;
      if (!id) return false;
      if (localId && id === localId) return false;
      if (finalizedIds.has(id)) return false;
      return true;
    })
    .map((summary) => ({
      source: "backend",
      summary,
      updatedAtMillis: summary.updatedAtMillis ?? summary.createdAtMillis ?? 0,
    }));
}

function pickCandidate(
  localCandidate: PendingCandidate | null,
  backendCandidates: PendingCandidate[],
): PendingCandidate | null {
  const candidates = [localCandidate, ...backendCandidates].filter(
    (candidate): candidate is PendingCandidate => Boolean(candidate),
  );

  if (candidates.length === 0) return null;

  return candidates.reduce((latest, current) =>
    current.updatedAtMillis > latest.updatedAtMillis ? current : latest,
  );
}

function buildDraftFromBackend(detail: BrewSessionDetail): DiagnoseFlowState {
  const latestShot = pickLatestShot(detail.shots);
  const session: BrewDiagnoseSessionDraft = {
    id: detail.id,
    coffeeProductId: detail.coffeeProductId ?? undefined,
    coffeeDisplayName: detail.coffeeDisplayName ?? undefined,
    coffeeRoast: detail.coffeeRoast ?? undefined,
    shopName: detail.shopName ?? undefined,
    brewMethod: BrewMethod.ESPRESSO,
    doseGrams: latestShot?.doseGrams ?? undefined,
    yieldGrams: latestShot?.yieldGrams ?? undefined,
    brewTimeSeconds: latestShot?.brewTimeSeconds ?? undefined,
    temperatureCelsius: latestShot?.temperatureCelsius ?? undefined,
    tasteFeedback: latestShot?.tasteFeedback ?? undefined,
    grinderModel: latestShot?.grinderModel ?? undefined,
    grindSetting: latestShot?.grindSetting ?? undefined,
    markedAsSuccessful: detail.markedAsSuccessful,
    history: buildHistory(detail.shots),
    lastDiagnosis: buildLastDiagnosis(latestShot),
  };

  const resumeTarget: DiagnoseResumeTarget = detail.markedAsSuccessful ? "success" : "flow";
  const step =
    resumeTarget === "success" ? DiagnoseStep.Recommendation : getResumeStep(session);

  return {
    step,
    session,
    createdAtMillis: detail.createdAtMillis,
    updatedAtMillis: detail.updatedAtMillis,
    resumeTarget,
  };
}

function buildDraftFromSummary(summary: BrewDiagnoseSessionSummary): DiagnoseFlowState {
  const now = Date.now();
  const resumeTarget: DiagnoseResumeTarget = summary.markedAsSuccessful ? "success" : "flow";
  const session: BrewDiagnoseSessionDraft = {
    id: summary.id ?? summary.sessionId,
    coffeeProductId: summary.coffeeProductId ?? undefined,
    coffeeDisplayName: summary.coffeeDisplayName ?? undefined,
    brewMethod: BrewMethod.ESPRESSO,
    markedAsSuccessful: summary.markedAsSuccessful,
  };

  return {
    step: DiagnoseStep.CoffeeRoast,
    session,
    createdAtMillis: summary.createdAtMillis ?? now,
    updatedAtMillis: summary.updatedAtMillis ?? now,
    resumeTarget,
  };
}

function pickLatestShot(shots: BrewSessionShot[]): BrewSessionShot | null {
  if (shots.length === 0) return null;
  return shots.reduce((latest, current) =>
    current.timestampMillis > latest.timestampMillis ? current : latest,
  );
}

function buildHistory(shots: BrewSessionShot[]) {
  return shots
    .filter(
      (shot) =>
        shot.doseGrams != null &&
        shot.yieldGrams != null &&
        shot.brewTimeSeconds != null,
    )
    .map((shot) => ({
      timestamp: shot.timestampMillis,
      doseGrams: shot.doseGrams as number,
      yieldGrams: shot.yieldGrams as number,
      brewTimeSeconds: shot.brewTimeSeconds as number,
      temperatureCelsius: shot.temperatureCelsius ?? undefined,
    }));
}

function buildLastDiagnosis(shot: BrewSessionShot | null) {
  const diagnoseDetails = shot?.aiResult?.diagnoseDetails;
  if (!diagnoseDetails) return undefined;

  const recommendations = sortRecommendations(diagnoseDetails.recommendations ?? []);
  const [primary] = recommendations;
  if (!primary) return undefined;

  return {
    tags: diagnoseDetails.tags,
    summary: diagnoseDetails.summary,
    recommendations,
    recommendation: {
      id: primary.id,
      label: primary.title,
      description: primary.description,
    },
  };
}

function sortRecommendations(recommendations: Recommendation[]) {
  return [...recommendations].sort((a, b) => a.priority - b.priority);
}

function buildArchiveEntry(
  state: DiagnoseFlowState,
  reason: "saved" | "discarded",
): DiagnoseArchiveEntry {
  return {
    state,
    reason,
    finalizedAtMillis: Date.now(),
  };
}
