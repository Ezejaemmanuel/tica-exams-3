import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const userAuthSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  username: z.string().nullish(),
  imageUrl: z.string().nullish(),
  banned: z.boolean(),
  primaryEmailAddressId: z.string().nullish(),
  primaryPhoneNumberId: z.string().nullish(),
  emailAddresses: jsonSchema,
  phoneNumbers: jsonSchema,
  userId: z.string(),
})

export interface CompleteUserAuth extends z.infer<typeof userAuthSchema> {
  user?: CompleteUser | null
}

/**
 * relatedUserAuthSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserAuthSchema: z.ZodSchema<CompleteUserAuth> = z.lazy(() => userAuthSchema.extend({
  user: relatedUserSchema.nullish(),
}))
