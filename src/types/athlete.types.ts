import { Athlete } from "@prisma/client"

export type AthleteResponse = Pick<Athlete, "id" | "firstName" | "lastName" | "puesto" | "birthDate" | "accountId" | "createdAt" | "updatedAt">

export type AthleteListItem = Pick<Athlete, "id" | "firstName" | "lastName" | "puesto" | "birthDate"> & {
  latestAssessmentDate: string | null
  assessmentsCount: number
}

export type AthleteProfile = AthleteResponse & {
  assessmentsCount: number
  assignedRoutinesCount: number
}

export type CreateAthleteDto = Pick<Athlete, "firstName" | "lastName" | "puesto" | "birthDate" | "accountId">

export type UpdateAthleteDto = Partial<Pick<Athlete, "firstName" | "lastName" | "puesto" | "birthDate">>
