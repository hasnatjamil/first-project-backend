import { z } from 'zod'

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'Academic Faculty name is required' })
      .min(1, { message: 'Academic Faculty must be a non-empty string' }),
  }),
})
const updatAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'Academic Faculty name is required' })
      .min(1, { message: 'Academic Faculty must be a non-empty string' }),
  }),
})

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updatAcademicFacultyValidationSchema,
}
