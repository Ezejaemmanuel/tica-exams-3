import * as z from "zod"
import { Option } from "@prisma/client"
import { CompleteExam, relatedExamSchema } from "./index"

export const mathQuestionSchema = z.object({
  id: z.string(),
  questionNumber: z.number().int(),
  question: z.string(),
  optionA: z.string(),
  optionB: z.string(),
  optionC: z.string(),
  optionD: z.string(),
  correctAnswer: z.nativeEnum(Option),
  studentAnswer: z.nativeEnum(Option).nullish(),
  examId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMathQuestion extends z.infer<typeof mathQuestionSchema> {
  exam: CompleteExam
}

/**
 * relatedMathQuestionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMathQuestionSchema: z.ZodSchema<CompleteMathQuestion> = z.lazy(() => mathQuestionSchema.extend({
  exam: relatedExamSchema,
}))
