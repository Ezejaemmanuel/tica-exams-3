import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteUserExam, relatedUserExamSchema } from "./index"

export const resultSchema = z.object({
  id: z.string(),
  englishScore: z.number().int(),
  mathsScore: z.number().int(),
  generalStudiesScore: z.number().int(),
  totalScore: z.number().int(),
  aggregate: z.number(),
  position: z.number().int(),
  passed: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userExamId: z.number().int(),
})

export interface CompleteResult extends z.infer<typeof resultSchema> {
  user: CompleteUser
  userExam?: CompleteUserExam | null
}

/**
 * relatedResultSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedResultSchema: z.ZodSchema<CompleteResult> = z.lazy(() => resultSchema.extend({
  user: relatedUserSchema,
  userExam: relatedUserExamSchema.nullish(),
}))
