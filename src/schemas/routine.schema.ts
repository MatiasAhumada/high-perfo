import { z } from "zod";
import { RoutineStatus } from "@prisma/client";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

export const createRoutineTemplateSchema = z.object({
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  description: z.string().optional(),
  exercises: z.array(
    z.object({
      name: z.string().min(1, UI_TEXTS.FORM_ERRORS.REQUIRED),
      order: z.number().int().min(0),
      sets: z.number().int().min(1),
      reps: z.number().int().min(1),
      intensityPercent: z.number().min(0).max(100).optional(),
    }),
  ),
});

export const assignRoutineSchema = z.object({
  templateId: z.string().uuid(),
  startDate: z.string(),
  endDate: z.string().optional(),
});

export const updateRoutineStatusSchema = z.object({
  status: z.nativeEnum(RoutineStatus),
});
