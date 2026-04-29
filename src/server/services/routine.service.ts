import { assignedRoutineRepository } from "@/server/repository/assigned-routine.repository"
import { athleteRepository } from "@/server/repository/athlete.repository"
import { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { requireAccountAccess } from "@/lib/permissions"
import { RoutineStatus, Role } from "@prisma/client"
import httpStatus from "http-status"

type SessionUser = {
  id: string
  email: string
  name: string
  role: Role
  accountId: string
}

type AssignRoutineDto = {
  templateId: string
  startDate: Date
  endDate?: Date | null
}

type RoutineFindOptions = {
  status?: RoutineStatus
}

export const routineService = {
  async findByAthlete(
    athleteId: string,
    accountId: string,
    user: SessionUser,
    options: RoutineFindOptions,
  ) {
    requireAccountAccess(user, accountId)
    const athlete = await athleteRepository.findById(athleteId)
    if (!athlete || athlete.accountId !== accountId) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ATHLETE_NOT_FOUND,
      })
    }
    return assignedRoutineRepository.findByAthleteId(athleteId, options)
  },

  async findById(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId)
    const routine = await assignedRoutineRepository.findByIdWithTools(id)
    if (!routine) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      })
    }
    return routine
  },

  async assign(
    athleteId: string,
    dto: AssignRoutineDto,
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
    return assignedRoutineRepository.create({
      athlete: { connect: { id: athleteId } },
      coach: { connect: { id: coachId } },
      template: dto.templateId ? { connect: { id: dto.templateId } } : undefined,
      startDate: dto.startDate,
      endDate: dto.endDate,
      status: RoutineStatus.ACTIVE,
    })
  },

  async updateStatus(
    id: string,
    status: RoutineStatus,
    accountId: string,
    user: SessionUser,
  ) {
    requireAccountAccess(user, accountId)
    const routine = await assignedRoutineRepository.findByIdWithTools(id)
    if (!routine) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      })
    }
    return assignedRoutineRepository.updateStatus(id, status)
  },

  async send(id: string, accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId)
    const routine = await assignedRoutineRepository.findByIdWithTools(id)
    if (!routine) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ROUTINE_NOT_FOUND,
      })
    }
    return { sent: true }
  },
}
