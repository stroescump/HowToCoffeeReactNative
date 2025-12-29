import { strict as assert } from "assert";
import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { BrewMethod } from "@/src/shared/domain/models/BrewMethod";
import type { DiagnoseArchiveEntry } from "../../domain/models/DiagnoseArchiveEntry";
import type { DiagnoseFlowState } from "../../domain/models/DiagnoseFlowState";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import { useDiagnoseFlow } from "./useDiagnoseFlow";

class InMemoryDiagnoseRepository implements DiagnoseRepository {
  savedStates: DiagnoseFlowState[] = [];
  clears = 0;
  private draft: DiagnoseFlowState | null;
  archive: DiagnoseArchiveEntry[] = [];
  finalizedIds: string[] = [];

  constructor(initialDraft: DiagnoseFlowState | null = null) {
    this.draft = initialDraft;
  }

  async loadDraft(): Promise<DiagnoseFlowState | null> {
    return this.draft ? { ...this.draft, session: { ...this.draft.session } } : null;
  }

  async saveDraft(state: DiagnoseFlowState): Promise<void> {
    this.savedStates.push(state);
    this.draft = state;
  }

  async clearDraft(): Promise<void> {
    this.clears += 1;
    this.draft = null;
  }

  async appendArchive(entry: DiagnoseArchiveEntry): Promise<void> {
    this.archive.push(entry);
  }

  async loadArchive(): Promise<DiagnoseArchiveEntry[]> {
    return [...this.archive];
  }

  async addFinalizedSessionId(sessionId: string): Promise<void> {
    if (!this.finalizedIds.includes(sessionId)) {
      this.finalizedIds.push(sessionId);
    }
  }

  async loadFinalizedSessionIds(): Promise<string[]> {
    return [...this.finalizedIds];
  }
}

type HookResult = ReturnType<typeof useDiagnoseFlow> | undefined;

function renderUseDiagnoseFlow(repo: DiagnoseRepository) {
  const bag: { current: HookResult } = { current: undefined };

  function Wrapper() {
    bag.current = useDiagnoseFlow({ draftRepository: repo });
    return null;
  }

  const renderer = TestRenderer.create(<Wrapper />);

  const flushEffects = async () => {
    await act(async () => {
      await Promise.resolve();
    });
  };

  return { bag, flushEffects, renderer };
}

describe("useDiagnoseFlow persistence", () => {
  it("hydrates from repository without re-saving", async () => {
    const now = Date.now();
    const draft: DiagnoseFlowState = {
      step: DiagnoseStep.Yield,
      session: { brewMethod: BrewMethod.ESPRESSO, doseGrams: 18 },
      createdAtMillis: now - 1000,
      updatedAtMillis: now - 500,
      resumeTarget: "flow",
    };
    const repo = new InMemoryDiagnoseRepository(draft);
    const { bag, flushEffects } = renderUseDiagnoseFlow(repo);

    await flushEffects();

    assert.equal(bag.current?.state.step, DiagnoseStep.Yield);
    assert.equal(bag.current?.state.session.doseGrams, 18);
    assert.equal(repo.savedStates.length, 0, "hydrate should not persist immediately");
  });

  it("persists session updates", async () => {
    const repo = new InMemoryDiagnoseRepository(null);
    const { bag, flushEffects } = renderUseDiagnoseFlow(repo);
    await flushEffects(); // allow initial reset to run

    await act(async () => {
      await bag.current?.updateSession({ doseGrams: 18 });
    });

    assert.equal(repo.savedStates.length, 2);
    assert.equal(repo.savedStates[1].session.doseGrams, 18);
  });

  it("persists navigation events", async () => {
    const repo = new InMemoryDiagnoseRepository(null);
    const { bag, flushEffects } = renderUseDiagnoseFlow(repo);
    await flushEffects();

    await act(async () => {
      await bag.current?.nextStep();
    });

    assert.equal(repo.savedStates.length, 2);
    assert.equal(repo.savedStates[1].step, DiagnoseStep.Dose);
  });

  it("clears storage on reset without re-saving reset state", async () => {
    const now = Date.now();
    const repo = new InMemoryDiagnoseRepository({
      step: DiagnoseStep.Recommendation,
      session: { brewMethod: BrewMethod.ESPRESSO, doseGrams: 18, yieldGrams: 36 },
      createdAtMillis: now - 2000,
      updatedAtMillis: now - 1000,
      resumeTarget: "flow",
    });
    const { bag, flushEffects } = renderUseDiagnoseFlow(repo);
    await flushEffects();

    await act(async () => {
      await bag.current?.clearAndReset();
    });

    assert.equal(repo.clears, 1);
    assert.equal(
      repo.savedStates.length,
      0,
      "reset should not persist the cleared state back to storage",
    );
    assert.equal(bag.current?.state.step, DiagnoseStep.CoffeeRoast);
  });
});
