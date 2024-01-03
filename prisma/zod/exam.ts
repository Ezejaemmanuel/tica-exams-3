import * as z from "zod"
import { ClassLevel } from "@prisma/client"
import { CompleteEnglishQuestion, relatedEnglishQuestionSchema, CompleteGeneralStudiesQuestion, relatedGeneralStudiesQuestionSchema, CompleteMathQuestion, relatedMathQuestionSchema, CompleteUserExam, relatedUserExamSchema } from "./index"

export const examSchema = z.object({
  id: z.string(),
  date: z.date(),
  startTime: z.date().nullish(),
  EndTime: z.date().nullish(),
  classLevel: z.nativeEnum(ClassLevel),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteExam extends z.infer<typeof examSchema> {
  englishQuestions: CompleteEnglishQuestion[]
  generalStudiesQuestions: CompleteGeneralStudiesQuestion[]
  mathQuestions: CompleteMathQuestion[]
  userExam: CompleteUserExam[]
}

/**
 * relatedExamSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedExamSchema: z.ZodSchema<CompleteExam> = z.lazy(() => examSchema.extend({
  englishQuestions: relatedEnglishQuestionSchema.array(),
  generalStudiesQuestions: relatedGeneralStudiesQuestionSchema.array(),
  mathQuestions: relatedMathQuestionSchema.array(),
  userExam: relatedUserExamSchema.array(),
}))
