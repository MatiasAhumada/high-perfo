import { accountRepository } from "@/server/repository/account.repository"
import { ApiError } from "@/utils/handlers/apiError.handler"
import { CreateAccountDto, UpdateAccountDto } from "@/types/account.types"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { requireAccountAccess } from "@/lib/permissions"
import { ROLES } from "@/constants/roles.constant"
import httpStatus from "http-status"
import { Role } from "@prisma/client"

type SessionUser = {
  id: string
  email: string
  name: string
  role: Role
  accountId: string
}

export const accountService = {
  async findAll(user: SessionUser) {
    const isSuperAdmin = user.role === ROLES.SUPER_ADMIN
    if (isSuperAdmin) {
      return accountRepository.findAll()
    }
    const account = await accountRepository.findById(user.accountId)
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      })
    }
    return [account]
  },

  async findById(id: string, user: SessionUser) {
    requireAccountAccess(user, id)
    const account = await accountRepository.findById(id)
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      })
    }
    return account
  },

  async create(dto: CreateAccountDto) {
    return accountRepository.create({
      name: dto.name,
      isOrganization: dto.isOrganization,
      plan: { connect: { id: dto.planId } },
    })
  },

  async update(id: string, dto: UpdateAccountDto, user: SessionUser) {
    requireAccountAccess(user, id)
    const account = await accountRepository.findById(id)
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      })
    }
    const updateData: Record<string, unknown> = {}
    if (dto.name) updateData.name = dto.name
    if (dto.isOrganization !== undefined) updateData.isOrganization = dto.isOrganization
    if (dto.planId) updateData.plan = { connect: { id: dto.planId } }
    return accountRepository.update(id, updateData)
  },

  async getStats(accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId)
    const account = await accountRepository.findById(accountId)
    if (!account) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      })
    }
    const [coachCount, athleteCount, assessmentCount] = await Promise.all([
      accountRepository.countCoaches(accountId),
      accountRepository.countAthletes(accountId),
      accountRepository.countAssessments(accountId),
    ])
    return {
      coachCount,
      athleteCount,
      assessmentCount,
    }
  },
}
