import { NextRequest } from "next/server"
import { requireAuth, requireAccountAccess } from "@/lib/permissions"
import { athleteService } from "@/server/services/athlete.service"
import { createAthleteSchema } from "@/schemas/athlete.schema"
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { API_LIMITS } from "@/constants/api-limits.constant"
import httpStatus from "http-status"

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId
    const search = request.nextUrl.searchParams.get("search") ?? undefined
    const pageParam = request.nextUrl.searchParams.get("page")
    const pageSizeParam = request.nextUrl.searchParams.get("pageSize")
    const page = pageParam ? Number(pageParam) : 1
    const pageSize = pageSizeParam ? Number(pageSizeParam) : API_LIMITS.DEFAULT_PAGE_SIZE
    const result = await athleteService.findAll(accountId, user, { search, page, pageSize })
    return Response.json(result)
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId
    const body = await request.json()
    const parsed = createAthleteSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      )
    }
    const athlete = await athleteService.create(
      {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        puesto: parsed.data.puesto ?? null,
        birthDate: parsed.data.birthDate ? new Date(parsed.data.birthDate) : null,
        accountId,
      },
      accountId,
      user,
    )
    return Response.json(athlete, { status: httpStatus.CREATED })
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}
