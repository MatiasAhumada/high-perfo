import { NextRequest } from "next/server"
import { requireAuth } from "@/lib/permissions"
import { athleteService } from "@/server/services/athlete.service"
import { updateAthleteSchema } from "@/schemas/athlete.schema"
import { UpdateAthleteDto } from "@/types/athlete.types"
import apiErrorHandler from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import httpStatus from "http-status"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth()
    const { id } = await params
    const athlete = await athleteService.findById(id, user.accountId, user)
    return Response.json(athlete)
  } catch (error) {
    return apiErrorHandler({
      error: error as import("@/utils/handlers/apiError.handler").ApiError,
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
    const body = await request.json()
    const parsed = updateAthleteSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }

    const updateDto: UpdateAthleteDto = {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      puesto: parsed.data.puesto,
      birthDate: parsed.data.birthDate
        ? new Date(parsed.data.birthDate)
        : null,
    }
    const updated = await athleteService.update(id, updateDto, user.accountId, user)
    return Response.json(updated)
  } catch (error) {
    return apiErrorHandler({
      error: error as import("@/utils/handlers/apiError.handler").ApiError,
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
    await athleteService.delete(id, user.accountId, user)
    return new Response(null, { status: httpStatus.NO_CONTENT })
  } catch (error) {
    return apiErrorHandler({
      error: error as import("@/utils/handlers/apiError.handler").ApiError,
      request: _request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
