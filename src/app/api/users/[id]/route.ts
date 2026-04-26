import { NextRequest } from "next/server";
import { requireAuth, requireRole } from "@/lib/permissions";
import { userService } from "@/server/services/user.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { ROLES } from "@/constants/roles.constant";
import httpStatus from "http-status";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await requireAuth();
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN);

    const foundUser = await userService.findById(id);
    return Response.json(foundUser);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await requireAuth();
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN);

    const body = await request.json();
    const { isActive } = body;

    if (typeof isActive !== "boolean") {
      return Response.json(
        { error: "isActive must be a boolean" },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const updatedUser = await userService.updateActiveStatus(id, isActive);
    return Response.json(updatedUser);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}