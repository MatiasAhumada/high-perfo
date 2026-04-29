import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { RoutineStatus } from "@prisma/client"

const ASSIGNED_ROUTINE_SELECT = {
  id: true,
  athleteId: true,
  coachId: true,
  startDate: true,
  endDate: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.AssignedRoutineSelect

type AssignedRoutineFindOptions = {
  status?: RoutineStatus
}

export const assignedRoutineRepository = {
  async findByAthleteId(athleteId: string, options: AssignedRoutineFindOptions = {}) {
    const { status } = options

    const where: Prisma.AssignedRoutineWhereInput = {
      athleteId,
      ...(status && { status }),
    }

    return prisma.assignedRoutine.findMany({
      where,
      select: {
        ...ASSIGNED_ROUTINE_SELECT,
        coach: {
          select: { name: true },
        },
        toolExecutions: {
          orderBy: { toolKey: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  },

  async findByIdWithTools(id: string) {
    return prisma.assignedRoutine.findUnique({
      where: { id },
      include: {
        coach: {
          select: { name: true },
        },
        athlete: {
          select: { firstName: true, lastName: true },
        },
        toolExecutions: {
          orderBy: { toolKey: "asc" },
        },
      },
    })
  },

  async findByIdWithTemplate(id: string) {
    return prisma.assignedRoutine.findUnique({
      where: { id },
      include: {
        coach: {
          select: { name: true },
        },
        athlete: {
          select: { firstName: true, lastName: true, accountId: true },
        },
        toolExecutions: {
          orderBy: { toolKey: "asc" },
        },
        template: {
          include: {
            exercises: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    })
  },

  async create(data: Prisma.AssignedRoutineCreateInput) {
    return prisma.assignedRoutine.create({
      data,
      select: ASSIGNED_ROUTINE_SELECT,
    })
  },

  async updateStatus(id: string, status: RoutineStatus) {
    return prisma.assignedRoutine.update({
      where: { id },
      data: { status },
      select: ASSIGNED_ROUTINE_SELECT,
    })
  },

  async countActiveByAccountId(accountId: string) {
    return prisma.assignedRoutine.count({
      where: {
        athlete: { accountId },
        status: RoutineStatus.ACTIVE,
      },
    })
  },
}
