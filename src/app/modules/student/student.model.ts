import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name must be given.'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name must be given.'],
  },
})
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
})
const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message:
        "The gender field can only be one of the following: 'Male', 'Female'.",
    },
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { guardianSchema, required: true },
  localGuardian: { localGuardianSchema, required: true },
  profileImg: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    required: true,
  },
})

export const StudentModel = model<Student>('Student', studentSchema)
