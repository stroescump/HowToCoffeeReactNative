import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DiagnoseArchiveEntry } from "../../domain/models/DiagnoseArchiveEntry";
import type { DiagnoseFlowState } from "../../domain/models/DiagnoseFlowState";

const STORAGE_KEY = "diagnose_flow_draft";

let writeQueue: Promise<void> = Promise.resolve();

export async function readDiagnoseDraft(): Promise<DiagnoseFlowState | null> {
  const snapshot = await readSnapshot();
  return snapshot.draft;
}

export async function writeDiagnoseDraft(state: DiagnoseFlowState): Promise<void> {
  await withSnapshotWrite(async () => {
    const snapshot = await readSnapshot();
    await writeSnapshot({
      ...snapshot,
      draft: state,
    });
  });
}

export async function clearDiagnoseDraft(): Promise<void> {
  await withSnapshotWrite(async () => {
    const snapshot = await readSnapshot();
    await writeSnapshot({
      ...snapshot,
      draft: null,
    });
  });
}

export async function readDiagnoseArchive(): Promise<DiagnoseArchiveEntry[]> {
  const snapshot = await readSnapshot();
  return snapshot.archive;
}

export async function appendDiagnoseArchive(entry: DiagnoseArchiveEntry): Promise<void> {
  await withSnapshotWrite(async () => {
    const snapshot = await readSnapshot();
    const archive = [...snapshot.archive, entry];
    await writeSnapshot({
      ...snapshot,
      archive,
    });
  });
}

export async function readFinalizedSessionIds(): Promise<string[]> {
  const snapshot = await readSnapshot();
  return snapshot.finalizedIds;
}

export async function addFinalizedSessionId(sessionId: string): Promise<void> {
  await withSnapshotWrite(async () => {
    const snapshot = await readSnapshot();
    if (snapshot.finalizedIds.includes(sessionId)) return;
    await writeSnapshot({
      ...snapshot,
      finalizedIds: [...snapshot.finalizedIds, sessionId],
    });
  });
}

type DiagnoseStorageSnapshot = {
  draft: DiagnoseFlowState | null;
  archive: DiagnoseArchiveEntry[];
  finalizedIds: string[];
};

async function readSnapshot(): Promise<DiagnoseStorageSnapshot> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      draft: null,
      archive: [],
      finalizedIds: [],
    };
  }
  const parsed = JSON.parse(raw) as Partial<DiagnoseStorageSnapshot>;
  return {
    draft: parsed.draft ?? null,
    archive: parsed.archive ?? [],
    finalizedIds: parsed.finalizedIds ?? [],
  };
}

async function writeSnapshot(snapshot: DiagnoseStorageSnapshot): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

async function withSnapshotWrite<T>(work: () => Promise<T>): Promise<T> {
  const next = writeQueue.then(work, work);
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}
