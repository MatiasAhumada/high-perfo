import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const METRIC_DEFINITION_SELECT = {
  id: true,
  accountId: true,
  key: true,
  label: true,
  unit: true,
  redZoneLimit: true,
  greenZoneLimit: true,
} satisfies Prisma.MetricDefinitionSelect;

export const metricDefinitionRepository = {
  async findByAccountId(accountId: string) {
    return prisma.metricDefinition.findMany({
      where: { accountId },
      select: METRIC_DEFINITION_SELECT,
      orderBy: { key: "asc" },
    });
  },

  async findById(id: string) {
    return prisma.metricDefinition.findUnique({
      where: { id },
      select: METRIC_DEFINITION_SELECT,
    });
  },

  async findByAccountIdAndKey(accountId: string, key: string) {
    return prisma.metricDefinition.findUnique({
      where: { accountId_key: { accountId, key } },
      select: METRIC_DEFINITION_SELECT,
    });
  },

  async create(data: Prisma.MetricDefinitionCreateInput) {
    return prisma.metricDefinition.create({
      data,
      select: METRIC_DEFINITION_SELECT,
    });
  },

  async update(id: string, data: Prisma.MetricDefinitionUpdateInput) {
    return prisma.metricDefinition.update({
      where: { id },
      data,
      select: METRIC_DEFINITION_SELECT,
    });
  },

  async delete(id: string) {
    return prisma.metricDefinition.delete({
      where: { id },
      select: METRIC_DEFINITION_SELECT,
    });
  },
};
