import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const ACCOUNT_SELECT = {
  id: true,
  name: true,
  isOrganization: true,
  planId: true,
  createdAt: true,
  updatedAt: true,
  plan: {
    select: {
      id: true,
      name: true,
      maxCoaches: true,
      maxAthletes: true,
      maxAssessments: true,
    },
  },
} satisfies Prisma.AccountSelect;

export const accountRepository = {
  async findById(id: string) {
    return prisma.account.findUnique({
      where: { id },
      select: ACCOUNT_SELECT,
    });
  },

  async findByIdWithPlan(id: string) {
    return prisma.account.findUnique({
      where: { id },
      include: { plan: true },
    });
  },

  async findAll() {
    return prisma.account.findMany({
      select: ACCOUNT_SELECT,
      orderBy: { createdAt: "desc" },
    });
  },

  async create(data: Prisma.AccountCreateInput) {
    return prisma.account.create({
      data,
      select: ACCOUNT_SELECT,
    });
  },

  async update(id: string, data: Prisma.AccountUpdateInput) {
    return prisma.account.update({
      where: { id },
      data,
      select: ACCOUNT_SELECT,
    });
  },

  async countCoaches(accountId: string) {
    return prisma.user.count({
      where: { accountId, deletedAt: null },
    });
  },

  async countAthletes(accountId: string) {
    return prisma.athlete.count({
      where: { accountId, deletedAt: null },
    });
  },

  async countAssessments(accountId: string) {
    return prisma.assessment.count({
      where: { athlete: { accountId } },
    });
  },
};
