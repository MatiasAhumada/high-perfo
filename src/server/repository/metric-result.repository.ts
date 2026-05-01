import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const metricResultRepository = {
  async findByAssessmentId(assessmentId: string) {
    return prisma.metricResult.findMany({
      where: { assessmentId },
      orderBy: { key: "asc" },
    });
  },

  async createBulk(items: Prisma.MetricResultCreateManyInput[]) {
    return prisma.metricResult.createMany({
      data: items,
    });
  },

  async update(id: string, data: Prisma.MetricResultUpdateInput) {
    return prisma.metricResult.update({
      where: { id },
      data,
    });
  },

  async deleteByAssessmentId(assessmentId: string) {
    return prisma.metricResult.deleteMany({
      where: { assessmentId },
    });
  },
};
