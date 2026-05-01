import { athleteRepository } from "@/server/repository/athlete.repository";
import { accountRepository } from "@/server/repository/account.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { CreateAthleteDto, UpdateAthleteDto } from "@/types/athlete.types";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import { requireAccountAccess } from "@/lib/permissions";
import { Prisma } from "@prisma/client";
import { Role } from "@prisma/client";
import httpStatus from "http-status";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  accountId: string;
};

type AthleteFindOptions = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export const athleteService = {
  async findAll(
    accountId: string,
    user: SessionUser,
    options: AthleteFindOptions,
  ) {
    requireAccountAccess(user, accountId);
    return athleteRepository.findByAccountId(accountId, options);
  },

  async findById(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const athlete = await athleteRepository.findByIdWithLatestAssessment(id);
    if (!athlete || athlete.accountId !== accountId) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ATHLETE_NOT_FOUND,
      });
    }
    return athlete;
  },

  async create(dto: CreateAthleteDto, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const account = await accountRepository.findByIdWithPlan(accountId);
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    }
    const currentCount = await athleteRepository.countByAccountId(accountId);
    if (currentCount >= account.plan.maxAthletes) {
      throw new ApiError({
        status: httpStatus.FORBIDDEN,
        message: ERROR_MESSAGES.ATHLETE_LIMIT_REACHED,
      });
    }
    return athleteRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      puesto: dto.puesto,
      birthDate: dto.birthDate,
      account: { connect: { id: accountId } },
    });
  },

  async update(
    id: string,
    dto: Record<string, unknown>,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId);
    const athlete = await athleteRepository.findById(id);
    if (!athlete || athlete.accountId !== accountId) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ATHLETE_NOT_FOUND,
      });
    }
    return athleteRepository.update(id, dto as Prisma.AthleteUpdateInput);
  },

  async delete(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const athlete = await athleteRepository.findById(id);
    if (!athlete || athlete.accountId !== accountId) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ATHLETE_NOT_FOUND,
      });
    }
    return athleteRepository.softDelete(id);
  },
};
