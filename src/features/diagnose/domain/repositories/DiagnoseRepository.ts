import type { DiagnoseArchiveEntry } from "../models/DiagnoseArchiveEntry";
import type { DiagnoseFlowState } from "../models/DiagnoseFlowState";

export interface DiagnoseRepository {
    loadDraft(): Promise<DiagnoseFlowState | null>;
    saveDraft(state: DiagnoseFlowState): Promise<void>;
    clearDraft(): Promise<void>;
    appendArchive(entry: DiagnoseArchiveEntry): Promise<void>;
    loadArchive(): Promise<DiagnoseArchiveEntry[]>;
    addFinalizedSessionId(sessionId: string): Promise<void>;
    loadFinalizedSessionIds(): Promise<string[]>;
}
