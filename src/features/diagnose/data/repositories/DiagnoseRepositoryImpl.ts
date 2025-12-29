import type { DiagnoseArchiveEntry } from "../../domain/models/DiagnoseArchiveEntry";
import type { DiagnoseFlowState } from "../../domain/models/DiagnoseFlowState";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import {
    addFinalizedSessionId,
    appendDiagnoseArchive,
    clearDiagnoseDraft,
    readDiagnoseDraft,
    readDiagnoseArchive,
    readFinalizedSessionIds,
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

    async appendArchive(entry: DiagnoseArchiveEntry): Promise<void> {
        return appendDiagnoseArchive(entry);
    }

    async loadArchive() {
        return readDiagnoseArchive();
    }

    async addFinalizedSessionId(sessionId: string): Promise<void> {
        return addFinalizedSessionId(sessionId);
    }

    async loadFinalizedSessionIds(): Promise<string[]> {
        return readFinalizedSessionIds();
    }
}

export const draftRepo = new DiagnoseRepositoryImpl(); // DI super simplu pentru MVP
