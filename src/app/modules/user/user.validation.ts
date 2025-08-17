import { z } from 'zod'

export const userValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: 'Password cannot be more than 20 characters' })
    .optional(),
})

export const UserValidation = {
  userValidationSchema,
}
