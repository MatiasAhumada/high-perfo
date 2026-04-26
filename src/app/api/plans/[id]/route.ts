import { NextRequest } from "next/server"
import { requireAuth, requireSuperAdmin } from "@/lib/permissions"
import { planService } from "@/server/services/plan.service"
import { updatePlanSchema } from "@/schemas/plan.schema"
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import httpStatus from "http-status"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth()
    requireSuperAdmin(user)
    const { id } = await params
    const plan = await planService.findById(id)
    return Response.json(plan)
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
    requireSuperAdmin(user)
    const { id } = await params
    const body = await request.json()
    const parsed = updatePlanSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }

    const plan = await planService.update(id, parsed.data)
    return Response.json(plan)
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
    requireSuperAdmin(user)
    const { id } = await params
    await planService.delete(id)
    return new Response(null, { status: httpStatus.NO_CONTENT })
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: _request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
