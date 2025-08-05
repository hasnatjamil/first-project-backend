import * as z from "zod";

// Sub-schema: UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters.')
    .max(20, 'First name must be within 20 characters.')
    .regex(/^[A-Za-z]+$/, 'First name must contain only letters.'),
  middleName: z
    .string()
    .max(20, 'Middle name must be within 20 characters.')
    .optional()
    .or(z.literal('')),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters.')
    .max(20, 'Last name must be within 20 characters.')
    .regex(/^[A-Za-z]+$/, 'Last name must contain only letters.'),
})

// Sub-schema: Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z
    .string()
    .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z
    .string()
    .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
})

// Sub-schema: Local Guardian
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),   
  address: z.string(),
})

// Main Student Schema
export const studentValidationSchema = z.object({
  id: z.string().min(1),

  name: userNameValidationSchema,

  gender: z.enum(['Male', 'Female']),

  dateOfBirth: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, 'Date of birth must be in DD-MM-YYYY format'),

  email: z
    .string()
    .email('Invalid email format'),

  contactNo: z
    .string()
    .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),

  emergencyContactNo: z
    .string()
    .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),

  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),

  presentAddress: z.string(),
  permanentAddress: z.string(),

  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,

  profileImg: z
    .string()
    .url('Invalid image URL')
    .regex(/\.(jpg|jpeg|png|webp)$/i, 'Profile image must be a valid image URL')
    .optional(),

  isActive: z.enum(['active', 'blocked']),
})
export default studentValidationSchema;