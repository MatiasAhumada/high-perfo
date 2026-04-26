import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const PLAN_SELECT = {
  id: true,
  name: true,
  maxCoaches: true,
  maxAthletes: true,
  maxAssessments: true,
  price: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PlanSelect

export const planRepository = {
  async findById(id: string) {
    return prisma.plan.findUnique({
      where: { id },
      select: PLAN_SELECT,
    })
  },

  async findAll() {
    return prisma.plan.findMany({
      select: PLAN_SELECT,
      orderBy: { createdAt: "desc" },
    })
  },

  async create(data: Prisma.PlanCreateInput) {
    return prisma.plan.create({
      data,
      select: PLAN_SELECT,
    })
  },

  async update(id: string, data: Prisma.PlanUpdateInput) {
    return prisma.plan.update({
      where: { id },
      data,
      select: PLAN_SELECT,
    })
  },

  async delete(id: string) {
    return prisma.plan.delete({
      where: { id },
      select: PLAN_SELECT,
    })
  },
}
