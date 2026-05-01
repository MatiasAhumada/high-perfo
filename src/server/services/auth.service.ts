import { userRepository } from "@/server/repository/user.repository";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { AUTH_LIMITS } from "@/constants/api-limits.constant";
import { RegisterInput, ChangePasswordInput } from "@/schemas/auth.schema";
import { Role } from "@prisma/client";
import httpStatus from "http-status";

export const authService = {
  async register(dto: RegisterInput) {
    const existingUser = await userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED,
      });
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      AUTH_LIMITS.SALT_ROUNDS,
    );

    const result = await prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          name: dto.accountName,
          isOrganization: dto.isOrganization,
          planId: dto.planId,
        },
      });

      const user = await tx.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hashedPassword,
          role: "ORG_ADMIN" as Role,
          accountId: account.id,
        },
      });

      await tx.designConfig.create({
        data: { accountId: account.id },
      });

      return { account, user };
    });

    const { id, email, name, role, accountId, createdAt, updatedAt } =
      result.user;
    return { id, email, name, role, accountId, createdAt, updatedAt };
  },

  async changePassword(userId: string, dto: ChangePasswordInput) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    const isValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isValid) {
      throw new ApiError({
        status: httpStatus.UNAUTHORIZED,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const hashedPassword = await bcrypt.hash(
      dto.newPassword,
      AUTH_LIMITS.SALT_ROUNDS,
    );
    await userRepository.updatePassword(userId, hashedPassword);
  },
};
