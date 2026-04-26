import { NextRequest } from "next/server"
import { requireAuth, requireAccountAccess } from "@/lib/permissions"
import { statsService } from "@/server/services/stats.service"
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId
    requireAccountAccess(user, accountId)
    const stats = await statsService.getDashboardStats(accountId, user)
    return Response.json(stats)
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
