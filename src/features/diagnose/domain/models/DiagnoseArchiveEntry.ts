import type { DiagnoseFlowState } from "./DiagnoseFlowState";

export type DiagnoseArchiveEntry = {
  state: DiagnoseFlowState;
  reason: "saved" | "discarded";
  finalizedAtMillis: number;
};
