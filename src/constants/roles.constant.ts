import { Role } from "@prisma/client"

export const ROLES: Record<Role, Role> = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ORG_ADMIN: "ORG_ADMIN",
  COACH: "COACH",
}
