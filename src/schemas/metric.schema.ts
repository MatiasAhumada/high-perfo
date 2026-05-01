import { z } from "zod";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

export const createMetricDefinitionSchema = z.object({
  key: z.string().min(1, UI_TEXTS.FORM_ERRORS.REQUIRED),
  label: z.string().min(1, UI_TEXTS.FORM_ERRORS.REQUIRED),
  unit: z.string().min(1, UI_TEXTS.FORM_ERRORS.REQUIRED),
  redZoneLimit: z.number().optional(),
  greenZoneLimit: z.number().optional(),
});

export const updateMetricDefinitionSchema =
  createMetricDefinitionSchema.partial();
