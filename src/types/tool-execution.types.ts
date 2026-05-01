import { ToolExecution } from "@prisma/client";
import { MetricKey } from "@/constants/metric-keys.constant";

export type ToolExecutionResponse = Pick<
  ToolExecution,
  "id" | "assignedRoutineId" | "toolKey" | "completed" | "updatedAt"
>;
export type ToolConfig = {
  key: string;
  label: string;
  description: string;
  icon: string;
  enabled: boolean;
};
export type CreateToolExecutionDto = Pick<
  ToolExecution,
  "assignedRoutineId" | "toolKey" | "data"
>;
export type ToolDataRecord = {
  metricKey: MetricKey;
  value: number;
  unit: string;
};
