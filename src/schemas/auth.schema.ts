import { z } from "zod"
import { UI_TEXTS } from "@/constants/ui-texts.constant"

export const loginSchema = z.object({
  email: z.string().email(UI_TEXTS.FORM_ERRORS.INVALID_EMAIL),
  password: z.string().min(8, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "8")),
})

export const registerSchema = z.object({
  email: z.string().email(UI_TEXTS.FORM_ERRORS.INVALID_EMAIL),
  password: z.string().min(8, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "8")),
  name: z.string().min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  planId: z.string().uuid(),
  accountName: z.string().min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  isOrganization: z.boolean(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "8")),
  newPassword: z.string().min(8, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "8")),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
