import { toolExecutionRepository } from "@/server/repository/tool-execution.repository";
import { assignedRoutineRepository } from "@/server/repository/assigned-routine.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { requireAccountAccess } from "@/lib/permissions";
import { Prisma, Role, ToolKey } from "@prisma/client";
import httpStatus from "http-status";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  accountId: string;
};

type CreateToolInput = {
  toolKey: string;
  data?: Record<string, unknown>;
};

type UpdateToolInput = {
  completed?: boolean;
  data?: Record<string, unknown>;
};

export const toolService = {
  async findByRoutine(routineId: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const routine =
      await assignedRoutineRepository.findByIdWithTools(routineId);
    if (!routine) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      });
    }
    return toolExecutionRepository.findByRoutineId(routineId);
  },

  async create(
    routineId: string,
    dto: CreateToolInput,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId);
    const routine =
      await assignedRoutineRepository.findByIdWithTools(routineId);
    if (!routine) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      });
    }
    const createData: Prisma.ToolExecutionCreateInput = {
      toolKey: dto.toolKey as ToolKey,
      data: (dto.data ?? Prisma.JsonNull) as Prisma.InputJsonValue,
      routine: { connect: { id: routineId } },
    };
    return toolExecutionRepository.create(createData);
  },

  async update(
    toolId: string,
    dto: UpdateToolInput,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId);
    const tool = await toolExecutionRepository.findById(toolId);
    if (!tool) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }
    const routine = await assignedRoutineRepository.findByIdWithTools(
      tool.assignedRoutineId,
    );
    if (!routine) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      });
    }
    const updateData: Prisma.ToolExecutionUpdateInput = {};
    if (dto.completed !== undefined) updateData.completed = dto.completed;
    if (dto.data) updateData.data = dto.data as Prisma.InputJsonValue;
    return toolExecutionRepository.update(toolId, updateData);
  },
};
