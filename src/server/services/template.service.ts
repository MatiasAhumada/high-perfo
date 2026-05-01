import { routineTemplateRepository } from "@/server/repository/routine-template.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { CreateRoutineTemplateDto } from "@/types/routine-template.types";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { requireAccountAccess } from "@/lib/permissions";
import { Prisma } from "@prisma/client";
import { Role } from "@prisma/client";
import httpStatus from "http-status";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  accountId: string;
};

export const templateService = {
  async findByAccount(accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    return routineTemplateRepository.findByAccountId(accountId);
  },

  async findById(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const template = await routineTemplateRepository.findByIdWithExercises(id);
    if (!template) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      });
    }
    return template;
  },

  async create(
    dto: CreateRoutineTemplateDto,
    accountId: string,
    creatorId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId);
    const { exercises, ...templateData } = dto;
    return routineTemplateRepository.create({
      name: templateData.name,
      description: templateData.description,
      account: { connect: { id: accountId } },
      creator: { connect: { id: creatorId } },
      exercises: {
        create: exercises.map((exercise) => ({
          name: exercise.name,
          order: exercise.order,
          sets: exercise.sets,
          reps: exercise.reps,
          intensityPercent: exercise.intensityPercent,
        })),
      },
    });
  },

  async update(
    id: string,
    dto: Prisma.RoutineTemplateUpdateInput,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId);
    const template = await routineTemplateRepository.findByIdWithExercises(id);
    if (!template) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      });
    }
    return routineTemplateRepository.update(id, dto);
  },

  async delete(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const template = await routineTemplateRepository.findByIdWithExercises(id);
    if (!template) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      });
    }
    return routineTemplateRepository.delete(id);
  },
};
