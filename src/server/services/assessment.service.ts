import { assessmentRepository } from "@/server/repository/assessment.repository"
import { athleteRepository } from "@/server/repository/athlete.repository"
import { accountRepository } from "@/server/repository/account.repository"
import { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { requireAccountAccess } from "@/lib/permissions"
import { AssessmentType, Role } from "@prisma/client"
import httpStatus from "http-status"

type SessionUser = {
  id: string
  email: string
  name: string
  role: Role
  accountId: string
}

type AssessmentFindOptions = {
  page?: number
  pageSize?: number
}

type CreateAssessmentInput = {
  type: AssessmentType
  bodyWeight?: number | null
  date?: string
  results: Array<{
    key: string
    rawValue: number
    calculatedValue?: number | null
  }>
}

type UpdateAssessmentInput = {
  type?: AssessmentType
  bodyWeight?: number | null
  date?: string
}

export const assessmentService = {
  async findByAthlete(
    athleteId: string,
    accountId: string,
    user: SessionUser,
    options: AssessmentFindOptions,
  ) {
    requireAccountAccess(user, accountId)
    const athlete = await athleteRepository.findById(athleteId)
    if (!athlete || athlete.accountId !== accountId) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ATHLETE_NOT_FOUND,
      })
    }
    return assessmentRepository.findByAthleteId(athleteId, options)
  },

  async findById(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId)
    const assessment = await assessmentRepository.findByIdWithResults(id)
    if (!assessment) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ASSESSMENT_NOT_FOUND,
      })
    }
    return assessment
  },

  async create(
    athleteId: string,
    dto: CreateAssessmentInput,
    coachId: string,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId)
    const athlete = await athleteRepository.findById(athleteId)
    if (!athlete || athlete.accountId !== accountId) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ATHLETE_NOT_FOUND,
      })
    }
    const account = await accountRepository.findByIdWithPlan(accountId)
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      })
    }
    const currentCount = await assessmentRepository.countByAccountId(accountId)
    if (currentCount >= account.plan.maxAssessments) {
      throw new ApiError({
        status: httpStatus.FORBIDDEN,
        message: ERROR_MESSAGES.ASSESSMENT_LIMIT_REACHED,
      })
    }
    const assessment = await assessmentRepository.create({
      athlete: { connect: { id: athleteId } },
      coach: { connect: { id: coachId } },
      type: dto.type,
      bodyWeight: dto.bodyWeight,
      date: dto.date ? new Date(dto.date) : new Date(),
      results: {
        create: dto.results.map((result) => ({
          key: result.key,
          rawValue: result.rawValue,
          calculatedValue: result.calculatedValue,
        })),
      },
    })
    return assessment
  },

  async update(
    id: string,
    dto: UpdateAssessmentInput,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId)
    const assessment = await assessmentRepository.findByIdWithResults(id)
    if (!assessment) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ASSESSMENT_NOT_FOUND,
      })
    }
    return assessmentRepository.update(id, {
      ...(dto.type && { type: dto.type }),
      ...(dto.bodyWeight !== undefined && { bodyWeight: dto.bodyWeight }),
      ...(dto.date && { date: new Date(dto.date) }),
    })
  },

  async delete(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId)
    const assessment = await assessmentRepository.findByIdWithResults(id)
    if (!assessment) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ASSESSMENT_NOT_FOUND,
      })
    }
    return assessmentRepository.delete(id)
  },
}
