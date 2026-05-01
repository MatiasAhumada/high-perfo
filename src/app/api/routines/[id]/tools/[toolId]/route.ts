import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/permissions";
import { toolService } from "@/server/services/tool.service";
import { updateToolExecutionSchema } from "@/schemas/tool.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; toolId: string }> },
) {
  try {
    const user = await requireAuth();
    const { toolId } = await params;
    const body = await request.json();
    const parsed = updateToolExecutionSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const updated = await toolService.update(
      toolId,
      parsed.data,
      user.accountId,
      user,
    );
    return Response.json(updated);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
