import { MetricDefinition } from "@prisma/client";
import { MetricKey } from "@/constants/metric-keys.constant";

export type MetricDefinitionResponse = Pick<
  MetricDefinition,
  | "id"
  | "accountId"
  | "key"
  | "label"
  | "unit"
  | "redZoneLimit"
  | "greenZoneLimit"
>;

export type MetricDefinitionWithZones = MetricDefinitionResponse & {
  status: "RED" | "GREEN" | "YELLOW" | "NEUTRAL";
};

export type CreateMetricDefinitionDto = Pick<
  MetricDefinition,
  "accountId" | "key" | "label" | "unit" | "redZoneLimit" | "greenZoneLimit"
>;

export type MetricKeyConfig = {
  key: MetricKey;
  label: string;
  unit: string;
  redZoneLimit: number | null;
  greenZoneLimit: number | null;
};
