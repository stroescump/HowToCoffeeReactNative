import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DiagnoseFlowState } from "../../domain/entities/DiagnoseFlowState";

const STORAGE_KEY = "diagnose_flow_draft_v1";

export async function readDiagnoseDraft(): Promise<DiagnoseFlowState | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as DiagnoseFlowState;
}

export async function writeDiagnoseDraft(state: DiagnoseFlowState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function clearDiagnoseDraft(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}