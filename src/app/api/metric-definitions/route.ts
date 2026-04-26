import { NextRequest } from "next/server"
import { requireAuth, requireAccountAccess } from "@/lib/permissions"
import { metricService } from "@/server/services/metric.service"
import { createMetricDefinitionSchema } from "@/schemas/metric.schema"
import apiErrorHandler from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import httpStatus from "http-status"

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId
    requireAccountAccess(user, accountId)
    const definitions = await metricService.findAll(accountId, user)
    return Response.json(definitions)
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
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId
    requireAccountAccess(user, accountId)
    const body = await request.json()
    const parsed = createMetricDefinitionSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }
    const definition = await metricService.create(
      {
        accountId,
        key: parsed.data.key,
        label: parsed.data.label,
        unit: parsed.data.unit,
        redZoneLimit: parsed.data.redZoneLimit ?? null,
        greenZoneLimit: parsed.data.greenZoneLimit ?? null,
      },
      accountId,
      user,
    )
    return Response.json(definition, { status: httpStatus.CREATED })
  } catch (error) {
    return apiErrorHandler({
      error: error as import("@/utils/handlers/apiError.handler").ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
