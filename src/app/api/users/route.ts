import { NextRequest } from "next/server";
import { requireAuth, requireAccountAccess, requireRole } from "@/lib/permissions";
import { userService } from "@/server/services/user.service";
import { createUserSchema, createUserByAdminSchema } from "@/schemas/user.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { ROLES } from "@/constants/roles.constant";
import httpStatus from "http-status";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const isGlobal = request.nextUrl.searchParams.get("global") === "true";
    const search = request.nextUrl.searchParams.get("search") ?? undefined;
    const isActiveParam = request.nextUrl.searchParams.get("isActive");
    const isActive = isActiveParam === "true" ? true : isActiveParam === "false" ? false : undefined;

    if (isGlobal && user.role === ROLES.SUPER_ADMIN) {
      const users = await userService.findAllGlobal(user, search, isActive);
      return Response.json(users);
    }

    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId;
    requireAccountAccess(user, accountId);
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN);
    const users = await userService.findAll(accountId, user, search, isActive);
    return Response.json(users);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    requireRole(user, ROLES.SUPER_ADMIN, ROLES.ORG_ADMIN);
    const accountId = request.nextUrl.searchParams.get("accountId") ?? user.accountId;
    requireAccountAccess(user, accountId);
    const body = await request.json();

    const withRoleParsed = createUserByAdminSchema.safeParse(body);
    if (withRoleParsed.success) {
      const { role, ...userData } = withRoleParsed.data;
      const newUser = await userService.createWithRole(userData, accountId, role as Role, user);
      return Response.json(newUser, { status: httpStatus.CREATED });
    }

    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: httpStatus.BAD_REQUEST });
    }

    const newUser = await userService.createWithRole(parsed.data, accountId, "COACH", user);
    return Response.json(newUser, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}