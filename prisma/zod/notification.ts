import * as z from "zod"

export const notificationSchema = z.object({
  id: z.string(),
  message: z.string(),
  date: z.date(),
  seen: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
