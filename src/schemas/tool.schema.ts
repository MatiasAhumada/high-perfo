import { z } from "zod"

export const createToolExecutionSchema = z.object({
  toolKey: z.string().min(1),
  data: z.record(z.string(), z.unknown()).optional(),
})

export const updateToolExecutionSchema = z.object({
  completed: z.boolean().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
})
