import { NextRequest } from "next/server";
import { requireAuth, requireSuperAdmin } from "@/lib/permissions";
import { accountService } from "@/server/services/account.service";
import {
  createAccountSchema,
  createAccountWithUserSchema,
  createAccountWithPlanSchema,
} from "@/schemas/account.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const accounts = await accountService.findAll(user);
    return Response.json(accounts);
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
    requireSuperAdmin(user);
    const body = await request.json();

    const withUserParsed = createAccountWithUserSchema.safeParse(body);
    if (withUserParsed.success) {
      const account = await accountService.createWithPlanAndUser(
        withUserParsed.data,
        user,
      );
      return Response.json(account, { status: httpStatus.CREATED });
    }

    const parsed = createAccountSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const account = await accountService.create(parsed.data);
    return Response.json(account, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
