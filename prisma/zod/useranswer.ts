import * as z from "zod"
import { Option } from "@prisma/client"
import { CompleteUser, relatedUserSchema } from "./index"

export const userAnswerSchema = z.object({
  id: z.string(),
  userId: z.string(),
  questionId: z.number().int(),
  answer: z.nativeEnum(Option),
  createdAt: z.date(),
  updatedAt: z.date(),
  questionNumber: z.number().int(),
  subject: z.string(),
})

export interface CompleteUserAnswer extends z.infer<typeof userAnswerSchema> {
  user: CompleteUser
}

/**
 * relatedUserAnswerSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserAnswerSchema: z.ZodSchema<CompleteUserAnswer> = z.lazy(() => userAnswerSchema.extend({
  user: relatedUserSchema,
}))
