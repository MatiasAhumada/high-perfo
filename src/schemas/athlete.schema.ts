import { z } from "zod";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import { ATHLETE_FORM_LIMITS } from "@/constants/api-limits.constant";

export const createAthleteSchema = z.object({
  firstName: z
    .string()
    .min(
      ATHLETE_FORM_LIMITS.FIRST_NAME_MIN_LENGTH,
      UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace(
        "{min}",
        String(ATHLETE_FORM_LIMITS.FIRST_NAME_MIN_LENGTH),
      ),
    ),
  lastName: z
    .string()
    .min(
      ATHLETE_FORM_LIMITS.LAST_NAME_MIN_LENGTH,
      UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace(
        "{min}",
        String(ATHLETE_FORM_LIMITS.LAST_NAME_MIN_LENGTH),
      ),
    ),
  puesto: z.string().optional(),
  birthDate: z.string().optional(),
});

export const updateAthleteSchema = z.object({
  firstName: z
    .string()
    .min(
      ATHLETE_FORM_LIMITS.FIRST_NAME_MIN_LENGTH,
      UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace(
        "{min}",
        String(ATHLETE_FORM_LIMITS.FIRST_NAME_MIN_LENGTH),
      ),
    )
    .optional(),
  lastName: z
    .string()
    .min(
      ATHLETE_FORM_LIMITS.LAST_NAME_MIN_LENGTH,
      UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace(
        "{min}",
        String(ATHLETE_FORM_LIMITS.LAST_NAME_MIN_LENGTH),
      ),
    )
    .optional(),
  puesto: z.string().optional(),
  birthDate: z.string().optional(),
});
