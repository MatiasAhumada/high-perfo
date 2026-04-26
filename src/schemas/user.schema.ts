import { z } from "zod"
import { UI_TEXTS } from "@/constants/ui-texts.constant"

export const createUserSchema = z.object({
  email: z.string().email(UI_TEXTS.FORM_ERRORS.INVALID_EMAIL),
  name: z.string().min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  password: z.string().min(8, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "8")),
})

export const updateUserSchema = z.object({
  name: z.string().min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")).optional(),
  email: z.string().email(UI_TEXTS.FORM_ERRORS.INVALID_EMAIL).optional(),
})
