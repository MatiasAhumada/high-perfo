import { NextRequest } from "next/server"
import { requireAuth, requireRole, requireAccountAccess } from "@/lib/permissions"
import { accountService } from "@/server/services/account.service"
import { updateAccountSchema } from "@/schemas/account.schema"
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { ROLES } from "@/constants/roles.constant"
import httpStatus from "http-status"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth()
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN)
    const { id } = await params
    const account = await accountService.findById(id, user)
    return Response.json(account)
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: _request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth()
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN)
    const { id } = await params
    const body = await request.json()
    const parsed = updateAccountSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }

    const account = await accountService.update(id, parsed.data, user)
    return Response.json(account)
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
