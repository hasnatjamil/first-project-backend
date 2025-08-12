import { z } from 'zod'

export const userValidationSchema = z.object({
  password: z
    .string({invalid_type_error:'Password must be strong'})
    .max(20, { message: 'Password cannot be more than 20 characters' })
    .optional(),
})

export const UserValidation = {
  userValidationSchema,
}
