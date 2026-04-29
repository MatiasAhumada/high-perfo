import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { API_LIMITS } from "@/constants/api-limits.constant"

const ATHLETE_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  puesto: true,
  birthDate: true,
  accountId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.AthleteSelect

type AthleteFindOptions = {
  search?: string
  page?: number
  pageSize?: number
  orderBy?: Prisma.AthleteOrderByWithRelationInput
}

export const athleteRepository = {
  async findByAccountId(accountId: string, options: AthleteFindOptions = {}) {
    const page = options.page ?? 1
    const pageSize = options.pageSize ?? API_LIMITS.DEFAULT_PAGE_SIZE
    const skip = (page - 1) * pageSize

    const where: Prisma.AthleteWhereInput = {
      accountId,
      deletedAt: null,
    }

    if (options.search) {
      where.OR = [
        { firstName: { contains: options.search, mode: "insensitive" } },
        { lastName: { contains: options.search, mode: "insensitive" } },
      ]
    }

    const [athletes, total] = await Promise.all([
      prisma.athlete.findMany({
        where,
        select: ATHLETE_SELECT,
        orderBy: options.orderBy ?? { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.athlete.count({ where }),
    ])

    return { athletes, total, page, pageSize }
  },

  async findById(id: string) {
    return prisma.athlete.findUnique({
      where: { id, deletedAt: null },
      select: ATHLETE_SELECT,
    })
  },

  async findByIdWithLatestAssessment(id: string) {
    return prisma.athlete.findUnique({
      where: { id, deletedAt: null },
      select: {
        ...ATHLETE_SELECT,
        assessments: {
          take: 1,
          orderBy: { date: "desc" },
          include: {
            results: true,
          },
        },
      },
    })
  },

  async create(data: Prisma.AthleteCreateInput) {
    return prisma.athlete.create({
      data,
      select: ATHLETE_SELECT,
    })
  },

  async update(id: string, data: Prisma.AthleteUpdateInput) {
    return prisma.athlete.update({
      where: { id },
      data,
      select: ATHLETE_SELECT,
    })
  },

  async softDelete(id: string) {
    return prisma.athlete.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { id: true },
    })
  },

  async countByAccountId(accountId: string) {
    return prisma.athlete.count({
      where: { accountId, deletedAt: null },
    })
  },
}
