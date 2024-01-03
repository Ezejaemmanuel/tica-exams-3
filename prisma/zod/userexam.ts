import * as z from "zod"
import { CompleteExam, relatedExamSchema, CompleteResult, relatedResultSchema, CompleteUser, relatedUserSchema } from "./index"

export const userExamSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  examId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  examFinished: z.boolean(),
  resultId: z.string().nullish(),
})

export interface CompleteUserExam extends z.infer<typeof userExamSchema> {
  exam: CompleteExam
  result?: CompleteResult | null
  user: CompleteUser
}

/**
 * relatedUserExamSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserExamSchema: z.ZodSchema<CompleteUserExam> = z.lazy(() => userExamSchema.extend({
  exam: relatedExamSchema,
  result: relatedResultSchema.nullish(),
  user: relatedUserSchema,
}))
