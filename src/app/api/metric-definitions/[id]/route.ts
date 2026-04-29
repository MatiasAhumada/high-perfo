import { NextRequest } from "next/server"
import { requireAuth } from "@/lib/permissions"
import { metricService } from "@/server/services/metric.service"
import { updateMetricDefinitionSchema } from "@/schemas/metric.schema"
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import httpStatus from "http-status"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth()
    const { id } = await params
    const body = await request.json()
    const parsed = updateMetricDefinitionSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }

    const updated = await metricService.update(id, parsed.data, user.accountId, user)
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
    await metricService.delete(id, user.accountId, user)
    return new Response(null, { status: httpStatus.NO_CONTENT })
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: _request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
