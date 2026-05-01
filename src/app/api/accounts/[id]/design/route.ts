import { NextRequest } from "next/server";
import { requireAuth, requireAccountAccess } from "@/lib/permissions";
import { designService } from "@/server/services/design.service";
import { updateDesignConfigSchema } from "@/schemas/account.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id: accountId } = await params;
    requireAccountAccess(user, accountId);
    const config = await designService.findByAccount(accountId, user);
    return Response.json(config);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: _request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id: accountId } = await params;
    requireAccountAccess(user, accountId);
    const body = await request.json();
    const parsed = updateDesignConfigSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const updated = await designService.update(accountId, parsed.data, user);
    return Response.json(updated);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
