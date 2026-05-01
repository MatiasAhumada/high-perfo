import { planRepository } from "@/server/repository/plan.repository";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { CreatePlanDto, UpdatePlanDto } from "@/types/plan.types";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";
import httpStatus from "http-status";

export const planService = {
  async findAll() {
    return planRepository.findAll();
  },

  async findById(id: string) {
    const plan = await planRepository.findById(id);
    if (!plan) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.PLAN_NOT_FOUND,
      });
    }
    return plan;
  },

  async create(dto: CreatePlanDto) {
    return planRepository.create({
      name: dto.name,
      maxCoaches: dto.maxCoaches,
      maxAthletes: dto.maxAthletes,
      maxAssessments: dto.maxAssessments,
      price: dto.price,
    });
  },

  async update(id: string, dto: UpdatePlanDto) {
    await this.findById(id);
    return planRepository.update(id, dto);
  },

  async delete(id: string) {
    await this.findById(id);
    return planRepository.delete(id);
  },
};
