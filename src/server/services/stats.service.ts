import { statsRepository } from "@/server/repository/stats.repository"
import { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { requireAccountAccess } from "@/lib/permissions"
import { DashboardStats } from "@/types/stats.types"
import { Role } from "@prisma/client"
import httpStatus from "http-status"

type SessionUser = {
  id: string
  email: string
  name: string
  role: Role
  accountId: string
}

export const statsService = {
  async getDashboardStats(accountId: string, user: SessionUser): Promise<DashboardStats> {
    requireAccountAccess(user, accountId)
    const [
      totalAthletes,
      totalCoaches,
      totalAssessments,
      activeRoutines,
      licenseRevenue,
    ] = await Promise.all([
      statsRepository.countAthletesByAccountId(accountId),
      statsRepository.countCoachesByAccountId(accountId),
      statsRepository.countAssessmentsByAccountId(accountId),
      statsRepository.countActiveRoutinesByAccountId(accountId),
      statsRepository.sumRevenueByAccountId(accountId),
    ])
    return {
      totalAthletes,
      totalCoaches,
      totalAssessments,
      activeRoutines,
      licenseRevenue,
    }
  },
}
