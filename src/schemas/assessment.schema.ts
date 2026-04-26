import { z } from "zod"
import { AssessmentType } from "@prisma/client"

export const createAssessmentSchema = z.object({
  type: z.nativeEnum(AssessmentType),
  bodyWeight: z.number().min(20).max(250).optional(),
  date: z.string().optional(),
  results: z.array(z.object({
    key: z.string(),
    rawValue: z.number(),
  })),
})
