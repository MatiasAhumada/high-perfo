import { Account, Plan } from "@prisma/client"

export type AccountResponse = Pick<Account, "id" | "name" | "isOrganization" | "planId" | "createdAt" | "updatedAt">

export type AccountDetail = AccountResponse & {
  planName: string
  usersCount: number
  athletesCount: number
}

export type PlanResponse = Pick<Plan, "id" | "name" | "maxCoaches" | "maxAthletes" | "maxAssessments" | "price" | "createdAt" | "updatedAt">

export type PlanWithUsage = PlanResponse & {
  currentCoaches: number
  currentAthletes: number
  currentAssessments: number
  coachesAvailable: number
  athletesAvailable: number
  assessmentsAvailable: number
}

export type CreateAccountDto = Pick<Account, "name" | "isOrganization" | "planId">
export type UpdateAccountDto = Partial<Pick<Account, "name" | "isOrganization" | "planId">>
