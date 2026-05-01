import { NextRequest } from "next/server";
import { requireAuth, requireAccountAccess } from "@/lib/permissions";
import { routineService } from "@/server/services/routine.service";
import { assignRoutineSchema } from "@/schemas/routine.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
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
    const statusParam = request.nextUrl.searchParams.get("status") as
      | import("@prisma/client").RoutineStatus
      | null;
    const options = statusParam ? { status: statusParam } : {};
    const routines = await routineService.findByAthlete(
      athleteId,
      accountId,
      user,
      options,
    );
    return Response.json(routines);
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
    const parsed = assignRoutineSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const assignDto = {
      templateId: parsed.data.templateId,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    };
    const routine = await routineService.assign(
      athleteId,
      assignDto,
      user.id,
      accountId,
      user,
    );
    return Response.json(routine, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
