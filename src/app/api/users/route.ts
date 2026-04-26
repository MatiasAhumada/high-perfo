import { NextRequest } from "next/server"
import { requireAuth, requireAccountAccess, requireRole } from "@/lib/permissions"
import { userService } from "@/server/services/user.service"
import { createUserSchema } from "@/schemas/user.schema"
import apiErrorHandler from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { ROLES } from "@/constants/roles.constant"
import httpStatus from "http-status"

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId
    requireAccountAccess(user, accountId)
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN)
    const search = request.nextUrl.searchParams.get("search") ?? undefined
    const users = await userService.findAll(accountId, user, search)
    return Response.json(users)
  } catch (error) {
    return apiErrorHandler({
      error: error as import("@/utils/handlers/apiError.handler").ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN)
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId
    requireAccountAccess(user, accountId)
    const body = await request.json()
    const parsed = createUserSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }
    const coach = await userService.createCoach(parsed.data, accountId, user)
    return Response.json(coach, { status: httpStatus.CREATED })
  } catch (error) {
    return apiErrorHandler({
      error: error as import("@/utils/handlers/apiError.handler").ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
