import * as z from "zod"
import { Option } from "@prisma/client"
import { CompleteExam, relatedExamSchema } from "./index"

export const englishQuestionSchema = z.object({
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

export interface CompleteEnglishQuestion extends z.infer<typeof englishQuestionSchema> {
  exam: CompleteExam
}

/**
 * relatedEnglishQuestionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedEnglishQuestionSchema: z.ZodSchema<CompleteEnglishQuestion> = z.lazy(() => englishQuestionSchema.extend({
  exam: relatedExamSchema,
}))
