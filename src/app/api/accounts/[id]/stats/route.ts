import { NextRequest } from "next/server";
import {
  requireAuth,
  requireRole,
  requireAccountAccess,
} from "@/lib/permissions";
import { accountService } from "@/server/services/account.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { ROLES } from "@/constants/roles.constant";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN);
    const { id } = await params;
    const stats = await accountService.getStats(id, user);
    return Response.json(stats);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: _request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
