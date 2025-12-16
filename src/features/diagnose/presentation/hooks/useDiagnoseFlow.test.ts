import { strict as assert } from "assert";
import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { BrewMethod } from "@/src/shared/domain/models/BrewMethod";
import type { DiagnoseFlowState } from "../../domain/models/DiagnoseFlowState";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import { useDiagnoseFlow } from "./useDiagnoseFlow";

class InMemoryDiagnoseRepository implements DiagnoseRepository {
  savedStates: DiagnoseFlowState[] = [];
  clears = 0;
  private draft: DiagnoseFlowState | null;

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
    const draft: DiagnoseFlowState = {
      step: DiagnoseStep.Yield,
      session: { brewMethod: BrewMethod.ESPRESSO, doseGrams: 18 },
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

    assert.equal(repo.savedStates.length, 1);
    assert.equal(repo.savedStates[0].session.doseGrams, 18);
  });

  it("persists navigation events", async () => {
    const repo = new InMemoryDiagnoseRepository(null);
    const { bag, flushEffects } = renderUseDiagnoseFlow(repo);
    await flushEffects();

    await act(async () => {
      await bag.current?.nextStep();
    });

    assert.equal(repo.savedStates.length, 1);
    assert.equal(repo.savedStates[0].step, DiagnoseStep.Dose);
  });

  it("clears storage on reset without re-saving reset state", async () => {
    const repo = new InMemoryDiagnoseRepository({
      step: DiagnoseStep.Recommendation,
      session: { brewMethod: BrewMethod.ESPRESSO, doseGrams: 18, yieldGrams: 36 },
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
    assert.equal(bag.current?.state.step, DiagnoseStep.CoffeeType);
  });
});
