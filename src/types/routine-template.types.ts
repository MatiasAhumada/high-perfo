import { RoutineTemplate, TemplateExercise } from "@prisma/client"

export type RoutineTemplateResponse = Pick<RoutineTemplate, "id" | "name" | "description" | "accountId" | "creatorId">

export type RoutineTemplateDetail = RoutineTemplateResponse & {
  exercises: TemplateExerciseResponse[]
  creatorName: string
}

export type TemplateExerciseResponse = Pick<TemplateExercise, "id" | "templateId" | "name" | "order" | "sets" | "reps" | "intensityPercent">

export type CreateRoutineTemplateDto = Pick<RoutineTemplate, "name" | "description" | "accountId" | "creatorId"> & {
  exercises: CreateTemplateExerciseDto[]
}

export type CreateTemplateExerciseDto = Pick<TemplateExercise, "name" | "order" | "sets" | "reps" | "intensityPercent">
