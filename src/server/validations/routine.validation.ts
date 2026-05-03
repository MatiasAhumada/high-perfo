import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";

const prisma = new PrismaClient();

export async function validateExercisesExist(accountId: string | null) {
  const exerciseCount = await prisma.exerciseLibrary.count({
    where: {
      OR: [
        { accountId },
        { isGlobal: true },
      ],
    },
  });

  if (exerciseCount === 0) {
    throw new Error(ERROR_MESSAGES.NO_EXERCISES_AVAILABLE);
  }

  return true;
}

export async function validateToolTemplateHasExercises(toolTemplateId: string) {
  const toolTemplate = await prisma.toolTemplate.findUnique({
    where: { id: toolTemplateId },
    include: {
      exercises: true,
    },
  });

  if (!toolTemplate) {
    throw new Error(ERROR_MESSAGES.TOOL_TEMPLATE_NOT_FOUND);
  }

  if (toolTemplate.exercises.length === 0) {
    throw new Error(ERROR_MESSAGES.TOOL_TEMPLATE_NO_EXERCISES);
  }

  return true;
}

export async function validateAthleteHasAssessments(athleteId: string) {
  const athlete = await prisma.athlete.findUnique({
    where: { id: athleteId },
    include: {
      assessments: {
        take: 1,
      },
    },
  });

  if (!athlete) {
    throw new Error(ERROR_MESSAGES.ATHLETE_NOT_FOUND);
  }

  if (athlete.assessments.length === 0) {
    throw new Error(ERROR_MESSAGES.ATHLETE_NO_ASSESSMENTS);
  }

  return true;
}

export async function validateRoutineCreation(athleteId: string) {
  await validateAthleteHasAssessments(athleteId);
  return true;
}
