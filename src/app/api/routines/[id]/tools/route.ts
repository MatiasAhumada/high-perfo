import { NextRequest } from "next/server";
import { requireAuth, requireAccountAccess } from "@/lib/permissions";
import { toolService } from "@/server/services/tool.service";
import { createToolExecutionSchema } from "@/schemas/tool.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id: routineId } = await params;
    const tools = await toolService.findByRoutine(
      routineId,
      user.accountId,
      user,
    );
    return Response.json(tools);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: _request,
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
    const { id: routineId } = await params;
    const body = await request.json();
    const parsed = createToolExecutionSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const tool = await toolService.create(
      routineId,
      parsed.data,
      user.accountId,
      user,
    );
    return Response.json(tool, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
