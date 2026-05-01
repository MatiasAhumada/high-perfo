import { Plan } from "@prisma/client";

export type PlanResponse = Pick<
  Plan,
  | "id"
  | "name"
  | "maxCoaches"
  | "maxAthletes"
  | "maxAssessments"
  | "price"
  | "createdAt"
  | "updatedAt"
>;
export type CreatePlanDto = Pick<
  Plan,
  "name" | "maxCoaches" | "maxAthletes" | "maxAssessments"
> & { price?: number };
export type UpdatePlanDto = Partial<CreatePlanDto>;
