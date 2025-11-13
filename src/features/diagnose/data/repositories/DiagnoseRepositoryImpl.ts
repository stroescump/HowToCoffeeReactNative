import type { DiagnoseFlowState } from "../../domain/entities/DiagnoseFlowState";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import {
    clearDiagnoseDraft,
    readDiagnoseDraft,
    writeDiagnoseDraft,
} from "../datasources/DiagnoseStorage";

export class DiagnoseRepositoryImpl implements DiagnoseRepository {
    async loadDraft(): Promise<DiagnoseFlowState | null> {
        return readDiagnoseDraft();
    }

    async saveDraft(state: DiagnoseFlowState): Promise<void> {
        return writeDiagnoseDraft(state);
    }

    async clearDraft(): Promise<void> {
        return clearDiagnoseDraft();
    }
}