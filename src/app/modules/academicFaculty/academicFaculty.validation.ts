import { z } from 'zod'

const createAcademicFacultyValidationSchema = z.object({
  name: z
    .string({ message: 'Academic Faculty name is required' }) // correct property
    .min(1, { message: 'Academic Faculty must be a non-empty string' }), // add extra validation
})
const updatAcademicFacultyValidationSchema = z.object({
  name: z
    .string({ message: 'Academic Faculty name is required' }) // correct property
    .min(1, { message: 'Academic Faculty must be a non-empty string' }), // add extra validation
})

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updatAcademicFacultyValidationSchema,
}
