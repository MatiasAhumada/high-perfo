import { AssignedRoutine } from "@prisma/client";

export type AssignedRoutineResponse = Pick<
  AssignedRoutine,
  "id" | "athleteId" | "coachId" | "startDate" | "endDate" | "status"
>;
export type AssignedRoutineDetail = AssignedRoutineResponse & {
  athleteName: string;
  coachName: string;
  toolExecutionsCount: number;
};
export type CreateAssignedRoutineDto = Pick<
  AssignedRoutine,
  "athleteId" | "coachId" | "startDate" | "endDate" | "status"
>;
export type SendRoutineDto = { routineId: string; athleteIds: string[] };
