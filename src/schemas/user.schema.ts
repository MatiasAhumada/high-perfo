import { z } from "zod";
import { Role } from "@prisma/client";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

export const createUserSchema = z.object({
  email: z.string().email(UI_TEXTS.FORM_ERRORS.INVALID_EMAIL),
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  password: z
    .string()
    .min(8, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "8")),
  role: z.nativeEnum(Role).default("COACH"),
});

export const createUserByAdminSchema = z.object({
  email: z.string().email(UI_TEXTS.FORM_ERRORS.INVALID_EMAIL),
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  password: z
    .string()
    .min(8, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "8")),
  role: z.nativeEnum(Role),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2"))
    .optional(),
  email: z.string().email(UI_TEXTS.FORM_ERRORS.INVALID_EMAIL).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateUserByAdminInput = z.infer<typeof createUserByAdminSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
