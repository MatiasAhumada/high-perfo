import { NextRequest } from "next/server";
import { requireAuth, requireAccountAccess } from "@/lib/permissions";
import { assessmentService } from "@/server/services/assessment.service";
import { createAssessmentSchema } from "@/schemas/assessment.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { API_LIMITS } from "@/constants/api-limits.constant";
import httpStatus from "http-status";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id: athleteId } = await params;
    const accountId =
      request.nextUrl.searchParams.get("accountId") ?? user.accountId;
    requireAccountAccess(user, accountId);
    const pageParam = request.nextUrl.searchParams.get("page");
    const pageSizeParam = request.nextUrl.searchParams.get("pageSize");
    const page = pageParam ? Number(pageParam) : 1;
    const pageSize = pageSizeParam
      ? Number(pageSizeParam)
      : API_LIMITS.DEFAULT_PAGE_SIZE;
    const result = await assessmentService.findByAthlete(
      athleteId,
      accountId,
      user,
      { page, pageSize },
    );
    return Response.json(result);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id: athleteId } = await params;
    const accountId =
      request.nextUrl.searchParams.get("accountId") ?? user.accountId;
    requireAccountAccess(user, accountId);
    const body = await request.json();
    const parsed = createAssessmentSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const assessment = await assessmentService.create(
      athleteId,
      parsed.data,
      user.id,
      accountId,
      user,
    );
    return Response.json(assessment, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
