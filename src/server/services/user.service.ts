import { userRepository } from "@/server/repository/user.repository";
import { accountRepository } from "@/server/repository/account.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { CreateUserDto, UpdateUserDto } from "@/types/user.types";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { requireAccountAccess, requireSuperAdmin } from "@/lib/permissions";
import { ROLES } from "@/constants/roles.constant";
import { Role } from "@prisma/client";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { AUTH_LIMITS } from "@/constants/api-limits.constant";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  accountId: string;
};

export const userService = {
  async create(dto: CreateUserDto) {
    const existingUser = await userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.DUPLICATE_EMAIL,
      });
    }
    return userRepository.create(dto);
  },

  async findById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }
    return user;
  },

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    if (dto.email) {
      const existingUser = await userRepository.findByEmail(dto.email);
      if (existingUser && existingUser.id !== id) {
        throw new ApiError({
          status: httpStatus.CONFLICT,
          message: ERROR_MESSAGES.DUPLICATE_EMAIL,
        });
      }
    }
    return userRepository.update(id, dto);
  },

  async delete(id: string) {
    await this.findById(id);
    return userRepository.delete(id);
  },

  async updateActiveStatus(id: string, isActive: boolean) {
    await this.findById(id);
    return userRepository.updateActiveStatus(id, isActive);
  },

  async findAll(
    accountId: string,
    user: SessionUser,
    search?: string,
    isActive?: boolean,
  ) {
    requireAccountAccess(user, accountId);
    return userRepository.findAll(accountId, search, isActive);
  },

  async findAllGlobal(user: SessionUser, search?: string, isActive?: boolean) {
    requireSuperAdmin(user);
    return userRepository.findAllGlobal(search, isActive);
  },

  async createCoach(
    dto: { email: string; name: string; password: string },
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId);
    const account = await accountRepository.findByIdWithPlan(accountId);
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    }
    const currentCoachCount = await accountRepository.countCoaches(accountId);
    if (currentCoachCount >= account.plan.maxCoaches) {
      throw new ApiError({
        status: httpStatus.FORBIDDEN,
        message: ERROR_MESSAGES.COACH_LIMIT_REACHED,
      });
    }
    const existingUser = await userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.DUPLICATE_EMAIL,
      });
    }
    const hashedPassword = await bcrypt.hash(
      dto.password,
      AUTH_LIMITS.SALT_ROUNDS,
    );
    return userRepository.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
      role: "COACH" as Role,
      accountId,
    });
  },

  async createWithRole(
    dto: { email: string; name: string; password: string },
    accountId: string,
    role: Role,
    adminUser: SessionUser,
  ) {
    requireAccountAccess(adminUser, accountId);

    if (role !== "COACH") {
      requireSuperAdmin(adminUser);
    }

    const account = await accountRepository.findByIdWithPlan(accountId);
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    }

    if (role === "COACH") {
      const currentCoachCount = await accountRepository.countCoaches(accountId);
      if (account.plan && currentCoachCount >= account.plan.maxCoaches) {
        throw new ApiError({
          status: httpStatus.FORBIDDEN,
          message: ERROR_MESSAGES.COACH_LIMIT_REACHED,
        });
      }
    }

    const existingUser = await userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.DUPLICATE_EMAIL,
      });
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      AUTH_LIMITS.SALT_ROUNDS,
    );
    return userRepository.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
      role,
      accountId,
    });
  },
};
