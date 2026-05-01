import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const TOOL_EXECUTION_SELECT = {
  id: true,
  assignedRoutineId: true,
  toolKey: true,
  completed: true,
  data: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ToolExecutionSelect;

export const toolExecutionRepository = {
  async findByRoutineId(routineId: string) {
    return prisma.toolExecution.findMany({
      where: { assignedRoutineId: routineId },
      select: TOOL_EXECUTION_SELECT,
      orderBy: { toolKey: "asc" },
    });
  },

  async findById(id: string) {
    return prisma.toolExecution.findUnique({
      where: { id },
      select: TOOL_EXECUTION_SELECT,
    });
  },

  async create(data: Prisma.ToolExecutionCreateInput) {
    return prisma.toolExecution.create({
      data,
      select: TOOL_EXECUTION_SELECT,
    });
  },

  async update(id: string, data: Prisma.ToolExecutionUpdateInput) {
    return prisma.toolExecution.update({
      where: { id },
      data,
      select: TOOL_EXECUTION_SELECT,
    });
  },
};
