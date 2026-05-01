import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { API_LIMITS } from "@/constants/api-limits.constant";

const ASSESSMENT_SELECT = {
  id: true,
  date: true,
  type: true,
  bodyWeight: true,
  coach: {
    select: { name: true },
  },
} satisfies Prisma.AssessmentSelect;

type AssessmentFindOptions = {
  page?: number;
  pageSize?: number;
};

export const assessmentRepository = {
  async findByAthleteId(
    athleteId: string,
    options: AssessmentFindOptions = {},
  ) {
    const page = options.page ?? 1;
    const pageSize = options.pageSize ?? API_LIMITS.DEFAULT_PAGE_SIZE;
    const skip = (page - 1) * pageSize;

    const where: Prisma.AssessmentWhereInput = { athleteId };

    const [assessments, total] = await Promise.all([
      prisma.assessment.findMany({
        where,
        select: ASSESSMENT_SELECT,
        orderBy: { date: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.assessment.count({ where }),
    ]);

    return { assessments, total, page, pageSize };
  },

  async findByIdWithResults(id: string) {
    return prisma.assessment.findUnique({
      where: { id },
      include: {
        results: {
          orderBy: { key: "asc" },
        },
      },
    });
  },

  async create(data: Prisma.AssessmentCreateInput) {
    return prisma.assessment.create({
      data,
      include: {
        results: true,
      },
    });
  },

  async update(id: string, data: Prisma.AssessmentUpdateInput) {
    return prisma.assessment.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.assessment.delete({
      where: { id },
    });
  },

  async countByAccountId(accountId: string) {
    return prisma.assessment.count({
      where: { athlete: { accountId } },
    });
  },
};
