import { NextRequest } from "next/server";
import { requireAuth, requireSuperAdmin } from "@/lib/permissions";
import { planService } from "@/server/services/plan.service";
import { createPlanSchema } from "@/schemas/plan.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";

export async function GET() {
  try {
    const user = await requireAuth();
    requireSuperAdmin(user);
    const plans = await planService.findAll();
    return Response.json(plans);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: new NextRequest(new URL("/api/plans", "http://localhost")),
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    requireSuperAdmin(user);
    const body = await request.json();
    const parsed = createPlanSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const plan = await planService.create(parsed.data);
    return Response.json(plan, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
