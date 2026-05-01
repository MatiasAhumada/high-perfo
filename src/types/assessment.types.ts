import { Assessment } from "@prisma/client";
import { MetricResultData } from "./metric-result.types";

export type AssessmentResponse = Pick<
  Assessment,
  "id" | "athleteId" | "coachId" | "date" | "type" | "bodyWeight"
>;
export type AssessmentDetail = AssessmentResponse & {
  results: MetricResultData[];
  coachName: string;
  athleteName: string;
};
export type AssessmentListItem = Pick<
  Assessment,
  "id" | "date" | "type" | "bodyWeight"
> & { coachName: string; resultsCount: number };
export type CreateAssessmentDto = Pick<
  Assessment,
  "athleteId" | "coachId" | "type" | "bodyWeight"
> & { results: Omit<MetricResultData, "id" | "assessmentId">[] };
