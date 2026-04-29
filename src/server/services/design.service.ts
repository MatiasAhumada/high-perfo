import { designConfigRepository } from "@/server/repository/design-config.repository"
import { ApiError } from "@/utils/handlers/apiError.handler"
import { UpdateDesignConfigDto } from "@/types/design-config.types"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { requireAccountAccess } from "@/lib/permissions"
import { Role } from "@prisma/client"
import httpStatus from "http-status"

type SessionUser = {
  id: string
  email: string
  name: string
  role: Role
  accountId: string
}

export const designService = {
  async findByAccount(accountId: string, user: SessionUser) {
    requireAccountAccess(user, accountId)
    const config = await designConfigRepository.findByAccountId(accountId)
    if (!config) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.NOT_FOUND,
      })
    }
    return config
  },

  async update(accountId: string, dto: UpdateDesignConfigDto, user: SessionUser) {
    requireAccountAccess(user, accountId)
    const existing = await designConfigRepository.findByAccountId(accountId)
    if (!existing) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: ERROR_MESSAGES.NOT_FOUND,
      })
    }
    return designConfigRepository.update(accountId, dto)
  },
}
