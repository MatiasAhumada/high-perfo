import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";

const prisma = new PrismaClient();

export async function validateToolTemplateCreation(accountId: string | null) {
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

export async function validateExerciseExists(exerciseId: string, accountId: string | null) {
  const exercise = await prisma.exerciseLibrary.findFirst({
    where: {
      id: exerciseId,
      OR: [
        { accountId },
        { isGlobal: true },
      ],
    },
  });

  if (!exercise) {
    throw new Error(ERROR_MESSAGES.EXERCISE_NOT_FOUND);
  }

  return true;
}
