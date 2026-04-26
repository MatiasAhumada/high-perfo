import { z } from "zod"
import { UI_TEXTS } from "@/constants/ui-texts.constant"

export const createAccountSchema = z.object({
  name: z.string().min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  isOrganization: z.boolean(),
  planId: z.string().uuid(),
})

export const updateAccountSchema = z.object({
  name: z.string().min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")).optional(),
  isOrganization: z.boolean().optional(),
})

export const updateDesignConfigSchema = z.object({
  primaryColor: z.string().optional(),
  surfaceColor: z.string().optional(),
  surfaceVariant: z.string().optional(),
  textColor: z.string().optional(),
  fontFamilyHead: z.string().optional(),
  fontFamilyBody: z.string().optional(),
  borderRadius: z.string().optional(),
})
