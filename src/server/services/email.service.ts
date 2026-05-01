import { sendEmail } from "@/lib/email";
import { buildRoutineEmailHtml } from "@/lib/email-templates";
import { assignedRoutineRepository } from "@/server/repository/assigned-routine.repository";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

const DEFAULT_ROUTINE_NAME = "Rutina";

export const emailService = {
  async sendRoutineEmail(
    routineId: string,
    recipientEmails: string[],
    accountId: string,
  ): Promise<void> {
    const routine =
      await assignedRoutineRepository.findByIdWithTemplate(routineId);

    if (!routine) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      });
    }

    if (routine.athlete.accountId !== accountId) {
      throw new ApiError({
        status: httpStatus.FORBIDDEN,
        message: ERROR_MESSAGES.FORBIDDEN,
      });
    }

    const exercises = routine.template?.exercises ?? [];
    const routineName = routine.template?.name ?? DEFAULT_ROUTINE_NAME;

    const html = buildRoutineEmailHtml({
      routineName,
      athleteName: `${routine.athlete.firstName} ${routine.athlete.lastName}`,
      coachName: routine.coach.name,
      startDate: routine.startDate.toISOString().split("T")[0],
      endDate: routine.endDate?.toISOString().split("T")[0],
      exercises: exercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        intensityPercent: exercise.intensityPercent ?? undefined,
      })),
      toolExecutions: routine.toolExecutions.map((execution) => ({
        toolKey: execution.toolKey,
        completed: execution.completed,
      })),
    });

    await sendEmail({
      to: recipientEmails,
      subject: `Rutina de entrenamiento: ${routineName}`,
      html,
    });
  },
};
