import { MetricResult } from "@prisma/client"
import { MetricKey } from "@/constants/metric-keys.constant"

export type MetricResultResponse = Pick<MetricResult, "id" | "assessmentId" | "key" | "rawValue" | "calculatedValue">

export type MetricResultData = Pick<MetricResult, "id" | "assessmentId" | "key" | "rawValue" | "calculatedValue"> & {
  unit: string
  label: string
}

export type MetricInput = {
  key: MetricKey
  rawValue: number
  calculatedValue?: number
}

export type MetricWithTrend = MetricResultData & {
  previousValue: number | null
  trend: "UP" | "DOWN" | "STABLE"
  trendPercent: number | null
}
