import { prisma } from "@/lib/prisma";
import { accountRepository } from "@/server/repository/account.repository";
import { planRepository } from "@/server/repository/plan.repository";
import { userRepository } from "@/server/repository/user.repository";
import { designConfigRepository } from "@/server/repository/design-config.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { CreateAccountDto, UpdateAccountDto } from "@/types/account.types";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { requireAccountAccess, requireSuperAdmin } from "@/lib/permissions";
import { ROLES } from "@/constants/roles.constant";
import { DEFAULT_DESIGN } from "@/constants/default-design.constant";
import httpStatus from "http-status";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  accountId: string;
};

interface CreateAccountWithUserInput {
  accountName: string;
  isOrganization: boolean;
  maxCoaches: number;
  maxAthletes: number;
  userEmail: string;
  userName: string;
  userPassword: string;
  userRole: Role;
}

export const accountService = {
  async findAll(user: SessionUser) {
    const isSuperAdmin = user.role === ROLES.SUPER_ADMIN;
    if (isSuperAdmin) {
      return accountRepository.findAll();
    }
    const account = await accountRepository.findById(user.accountId);
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    }
    return [account];
  },

  async findById(id: string, user: SessionUser) {
    requireAccountAccess(user, id);
    const account = await accountRepository.findById(id);
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    }
    return account;
  },

  async create(dto: CreateAccountDto) {
    return accountRepository.create({
      name: dto.name,
      isOrganization: dto.isOrganization,
      plan: { connect: { id: dto.planId } },
    });
  },

  async createWithPlanAndUser(input: CreateAccountWithUserInput, adminUser: SessionUser) {
    requireSuperAdmin(adminUser);

    const { accountName, isOrganization, maxCoaches, maxAthletes, userEmail, userName, userPassword, userRole } = input;

    const hashedPassword = await bcrypt.hash(userPassword, 12);

    const result = await prisma.$transaction(async (tx) => {
      const plan = await tx.plan.create({
        data: {
          name: isOrganization ? `${accountName} - Plan` : "Coach Individual",
          maxCoaches,
          maxAthletes,
          maxAssessments: maxAthletes * 5,
        },
      });

      const account = await tx.account.create({
        data: {
          name: accountName,
          isOrganization,
          plan: { connect: { id: plan.id } },
        },
      });

      await tx.user.create({
        data: {
          email: userEmail,
          name: userName,
          password: hashedPassword,
          role: userRole,
          account: { connect: { id: account.id } },
        },
      });

      await tx.designConfig.create({
        data: {
          account: { connect: { id: account.id } },
          primaryColor: DEFAULT_DESIGN.primaryColor,
          surfaceColor: DEFAULT_DESIGN.surfaceColor,
          surfaceVariant: DEFAULT_DESIGN.surfaceVariant,
          textColor: DEFAULT_DESIGN.textColor,
          fontFamilyHead: DEFAULT_DESIGN.fontFamilyHead,
          fontFamilyBody: DEFAULT_DESIGN.fontFamilyBody,
          borderRadius: DEFAULT_DESIGN.borderRadius,
        },
      });

      return account;
    });

    return result;
  },

  async update(id: string, dto: UpdateAccountDto, user: SessionUser) {
    requireAccountAccess(user, id);
    const account = await accountRepository.findById(id);
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    }
    const updateData: Record<string, unknown> = {};
    if (dto.name) updateData.name = dto.name;
    if (dto.isOrganization !== undefined) updateData.isOrganization = dto.isOrganization;
    if (dto.planId) updateData.plan = { connect: { id: dto.planId } };
    return accountRepository.update(id, updateData);
  },

  async getStats(accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const account = await accountRepository.findById(accountId);
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    }
    const [coachCount, athleteCount, assessmentCount] = await Promise.all([
      accountRepository.countCoaches(accountId),
      accountRepository.countAthletes(accountId),
      accountRepository.countAssessments(accountId),
    ]);
    return {
      coachCount,
      athleteCount,
      assessmentCount,
    };
  },
};