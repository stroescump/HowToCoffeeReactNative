import type { DiagnoseFlowState } from "../entities/DiagnoseFlowState";

export interface DiagnoseRepository {
    loadDraft(): Promise<DiagnoseFlowState | null>;
    saveDraft(state: DiagnoseFlowState): Promise<void>;
    clearDraft(): Promise<void>;
}