import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { authService } from "@/server/services/auth.service"
import { changePasswordSchema } from "@/schemas/auth.schema"
import apiErrorHandler from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import httpStatus from "http-status"

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return Response.json(
        { error: { message: ERROR_MESSAGES.UNAUTHORIZED } },
        { status: httpStatus.UNAUTHORIZED },
      )
    }

    const body = await request.json()
    const parsed = changePasswordSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }

    await authService.changePassword(session.user.id, parsed.data)
    return Response.json({ message: ERROR_MESSAGES.PASSWORD_UPDATED })
  } catch (error) {
    return apiErrorHandler({
      error: error as import("@/utils/handlers/apiError.handler").ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
