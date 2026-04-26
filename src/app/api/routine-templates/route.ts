import { NextRequest } from "next/server"
import { requireAuth, requireAccountAccess } from "@/lib/permissions"
import { templateService } from "@/server/services/template.service"
import { createRoutineTemplateSchema } from "@/schemas/routine.schema"
import apiErrorHandler from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import httpStatus from "http-status"

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId
    requireAccountAccess(user, accountId)
    const templates = await templateService.findByAccount(accountId, user)
    return Response.json(templates)
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
    const parsed = createRoutineTemplateSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }
    const createDto: import("@/types/routine-template.types").CreateRoutineTemplateDto = {
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      accountId,
      creatorId: user.id,
      exercises: parsed.data.exercises.map((exercise) => ({
        name: exercise.name,
        order: exercise.order,
        sets: exercise.sets,
        reps: exercise.reps,
        intensityPercent: exercise.intensityPercent ?? null,
      })),
    }
    const template = await templateService.create(createDto, accountId, user.id, user)
    return Response.json(template, { status: httpStatus.CREATED })
  } catch (error) {
    return apiErrorHandler({
      error: error as import("@/utils/handlers/apiError.handler").ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
