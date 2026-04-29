import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"
import { ApiError } from "@/utils/handlers/apiError.handler"
import { ERROR_MESSAGES } from "@/constants/error-messages.constant"
import { ROLES } from "@/constants/roles.constant"
import httpStatus from "http-status"

type SessionUser = {
  id: string
  email: string
  name: string
  role: Role
  accountId: string
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await auth()

  if (!session?.user) {
    throw new ApiError({
      status: httpStatus.UNAUTHORIZED,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    })
  }

  return session.user
}

export function requireRole(user: SessionUser, ...roles: Role[]): void {
  const hasRole = roles.includes(user.role)

  if (!hasRole) {
    throw new ApiError({
      status: httpStatus.FORBIDDEN,
      message: ERROR_MESSAGES.FORBIDDEN,
    })
  }
}

export function requireAccountAccess(user: SessionUser, accountId: string): void {
  const isSuperAdmin = user.role === ROLES.SUPER_ADMIN
  const belongsToAccount = user.accountId === accountId

  if (!isSuperAdmin && !belongsToAccount) {
    throw new ApiError({
      status: httpStatus.FORBIDDEN,
      message: ERROR_MESSAGES.FORBIDDEN,
    })
  }
}

export function requireSuperAdmin(user: SessionUser): void {
  requireRole(user, ROLES.SUPER_ADMIN)
}

export function canAccessAccount(user: SessionUser, accountId: string): boolean {
  const isSuperAdmin = user.role === ROLES.SUPER_ADMIN
  const belongsToAccount = user.accountId === accountId

  return isSuperAdmin || belongsToAccount
}
