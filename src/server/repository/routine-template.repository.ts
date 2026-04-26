import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const ROUTINE_TEMPLATE_SELECT = {
  id: true,
  name: true,
  description: true,
  accountId: true,
  creatorId: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: { exercises: true },
  },
} satisfies Prisma.RoutineTemplateSelect

type TemplateFindOptions = {
  search?: string
}

export const routineTemplateRepository = {
  async findByAccountId(accountId: string, options: TemplateFindOptions = {}) {
    const where: Prisma.RoutineTemplateWhereInput = { accountId }

    if (options.search) {
      where.name = { contains: options.search, mode: "insensitive" }
    }

    return prisma.routineTemplate.findMany({
      where,
      select: ROUTINE_TEMPLATE_SELECT,
      orderBy: { createdAt: "desc" },
    })
  },

  async findByIdWithExercises(id: string) {
    return prisma.routineTemplate.findUnique({
      where: { id },
      include: {
        exercises: {
          orderBy: { order: "asc" },
        },
      },
    })
  },

  async create(data: Prisma.RoutineTemplateCreateInput) {
    return prisma.routineTemplate.create({
      data,
      include: {
        exercises: true,
      },
    })
  },

  async update(id: string, data: Prisma.RoutineTemplateUpdateInput) {
    return prisma.routineTemplate.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        accountId: true,
        creatorId: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },

  async delete(id: string) {
    return prisma.routineTemplate.delete({
      where: { id },
    })
  },
}
