import { prisma } from "@/lib/prisma";
import { RoutineStatus } from "@prisma/client";

const ZERO_REVENUE = 0;

export const statsRepository = {
  async countAthletesByAccountId(accountId: string) {
    return prisma.athlete.count({
      where: { accountId, deletedAt: null },
    });
  },

  async countCoachesByAccountId(accountId: string) {
    return prisma.user.count({
      where: { accountId, deletedAt: null },
    });
  },

  async countAssessmentsByAccountId(accountId: string) {
    return prisma.assessment.count({
      where: { athlete: { accountId } },
    });
  },

  async countActiveRoutinesByAccountId(accountId: string) {
    return prisma.assignedRoutine.count({
      where: {
        athlete: { accountId },
        status: RoutineStatus.ACTIVE,
      },
    });
  },

  async sumRevenueByAccountId(accountId: string) {
    const result = await prisma.account.findUnique({
      where: { id: accountId },
      select: {
        plan: {
          select: { price: true },
        },
      },
    });

    if (!result?.plan?.price) return ZERO_REVENUE;

    return result.plan.price;
  },
};
