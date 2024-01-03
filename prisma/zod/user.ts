import * as z from "zod"
import { Role, ClassLevel } from "@prisma/client"
import { CompleteResult, relatedResultSchema, CompleteUserAnswer, relatedUserAnswerSchema, CompleteUserExam, relatedUserExamSchema, CompleteUserAuth, relatedUserAuthSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  state: z.string(),
  country: z.string(),
  city: z.string(),
  homeAddress: z.string(),
  religion: z.string(),
  role: z.nativeEnum(Role),
  classLevel: z.nativeEnum(ClassLevel),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  result?: CompleteResult | null
  userAnswer: CompleteUserAnswer[]
  userExam: CompleteUserExam[]
  userAuth: CompleteUserAuth
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  result: relatedResultSchema.nullish(),
  userAnswer: relatedUserAnswerSchema.array(),
  userExam: relatedUserExamSchema.array(),
  userAuth: relatedUserAuthSchema,
}))
