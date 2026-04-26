import { NextRequest } from "next/server"
import { requireAuth, requireAccountAccess, requireRole } from "@/lib/permissions"
import { userService } from "@/server/services/user.service"
import { updateUserSchema } from "@/schemas/user.schema"
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
    const { id } = await params
    const targetUser = await userService.findById(id)
    requireAccountAccess(user, targetUser.accountId)
    return Response.json(targetUser)
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
    const { id } = await params
    const targetUser = await userService.findById(id)
    requireAccountAccess(user, targetUser.accountId)
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN)
    const body = await request.json()
    const parsed = updateUserSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }

    const updated = await userService.update(id, parsed.data)
    return Response.json(updated)
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth()
    const { id } = await params
    const targetUser = await userService.findById(id)
    requireAccountAccess(user, targetUser.accountId)
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN)
    await userService.delete(id)
    return new Response(null, { status: httpStatus.NO_CONTENT })
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: _request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
