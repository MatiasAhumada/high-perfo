import { z } from "zod";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

export const createPlanSchema = z.object({
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  maxCoaches: z
    .number()
    .int()
    .min(1, UI_TEXTS.FORM_ERRORS.MIN_VALUE.replace("{min}", "1")),
  maxAthletes: z
    .number()
    .int()
    .min(1, UI_TEXTS.FORM_ERRORS.MIN_VALUE.replace("{min}", "1")),
  maxAssessments: z
    .number()
    .int()
    .min(1, UI_TEXTS.FORM_ERRORS.MIN_VALUE.replace("{min}", "1")),
  price: z.number().optional(),
});

export const updatePlanSchema = z.object({
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2"))
    .optional(),
  maxCoaches: z
    .number()
    .int()
    .min(1, UI_TEXTS.FORM_ERRORS.MIN_VALUE.replace("{min}", "1"))
    .optional(),
  maxAthletes: z
    .number()
    .int()
    .min(1, UI_TEXTS.FORM_ERRORS.MIN_VALUE.replace("{min}", "1"))
    .optional(),
  maxAssessments: z
    .number()
    .int()
    .min(1, UI_TEXTS.FORM_ERRORS.MIN_VALUE.replace("{min}", "1"))
    .optional(),
  price: z.number().optional(),
});
