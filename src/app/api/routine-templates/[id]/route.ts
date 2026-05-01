import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/permissions";
import { templateService } from "@/server/services/template.service";
import { createRoutineTemplateSchema } from "@/schemas/routine.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const template = await templateService.findById(id, user.accountId, user);
    return Response.json(template);
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
    const { id } = await params;
    const body = await request.json();
    const parsed = createRoutineTemplateSchema.partial().safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const { exercises, ...templateData } = parsed.data;
    const updateInput: import("@prisma/client").Prisma.RoutineTemplateUpdateInput =
      {
        ...templateData,
      };
    if (exercises) {
      updateInput.exercises = {
        deleteMany: {},
        create: exercises,
      };
    }
    const updated = await templateService.update(
      id,
      updateInput,
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    await templateService.delete(id, user.accountId, user);
    return new Response(null, { status: httpStatus.NO_CONTENT });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: _request,
      fallbackMessage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
