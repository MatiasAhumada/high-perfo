import { metricDefinitionRepository } from "@/server/repository/metric-definition.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { CreateMetricDefinitionDto } from "@/types/metric-definition.types";
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

export const metricService = {
  async findAll(accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    return metricDefinitionRepository.findByAccountId(accountId);
  },

  async findById(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const metric = await metricDefinitionRepository.findById(id);
    if (!metric) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }
    return metric;
  },

  async create(
    dto: CreateMetricDefinitionDto,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId);
    const existing = await metricDefinitionRepository.findByAccountIdAndKey(
      accountId,
      dto.key,
    );
    if (existing) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: ERROR_MESSAGES.DUPLICATE_METRIC_KEY,
      });
    }
    return metricDefinitionRepository.create({
      key: dto.key,
      label: dto.label,
      unit: dto.unit,
      redZoneLimit: dto.redZoneLimit,
      greenZoneLimit: dto.greenZoneLimit,
      account: { connect: { id: accountId } },
    });
  },

  async update(
    id: string,
    dto: Prisma.MetricDefinitionUpdateInput,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId);
    const metric = await metricDefinitionRepository.findById(id);
    if (!metric) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }
    return metricDefinitionRepository.update(id, dto);
  },

  async delete(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId);
    const metric = await metricDefinitionRepository.findById(id);
    if (!metric) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }
    return metricDefinitionRepository.delete(id);
  },
};
