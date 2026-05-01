import { z } from "zod";
import { Role } from "@prisma/client";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  isOrganization: z.boolean(),
  planId: z.string().uuid(),
});

export const createAccountWithPlanSchema = z.object({
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  isOrganization: z.boolean(),
  maxCoaches: z.number().int().min(0).default(1),
  maxAthletes: z.number().int().min(1).default(10),
});

export const createAccountWithUserSchema = z.object({
  accountName: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  isOrganization: z.boolean(),
  maxCoaches: z.number().int().min(0).default(1),
  maxAthletes: z.number().int().min(1).default(10),
  userEmail: z.string().email(UI_TEXTS.FORM_ERRORS.INVALID_EMAIL),
  userName: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  userPassword: z
    .string()
    .min(8, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "8")),
  userRole: z.nativeEnum(Role),
});

export const updateAccountSchema = z.object({
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2"))
    .optional(),
  isOrganization: z.boolean().optional(),
});

export const updateDesignConfigSchema = z.object({
  primaryColor: z.string().optional(),
  surfaceColor: z.string().optional(),
  surfaceVariant: z.string().optional(),
  textColor: z.string().optional(),
  fontFamilyHead: z.string().optional(),
  fontFamilyBody: z.string().optional(),
  borderRadius: z.string().optional(),
});

export type CreateAccountWithUserInput = z.infer<
  typeof createAccountWithUserSchema
>;
export type CreateAccountWithPlanInput = z.infer<
  typeof createAccountWithPlanSchema
>;
