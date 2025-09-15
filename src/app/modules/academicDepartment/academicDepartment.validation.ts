import { z } from 'zod'

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Academic Department name is required',
      })
      .min(1, { message: 'Academic Department must be a non-empty string' }),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Academic faculty name is required',
      })
      .min(1, { message: 'Academic faculty must be a non-empty string' }),
  }),
})
const updatAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Academic Department name is required',
      })
      .min(1, { message: 'Academic Department must be a non-empty string' }),
    // academicFaculty: z
    //   .string({
    //     invalid_type_error: 'Academic faculty must be string',
    //     required_error: 'Academic faculty name is required',
    //   })
    //   .min(1, { message: 'Academic faculty must be a non-empty string' }),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updatAcademicDepartmentValidationSchema,
}
