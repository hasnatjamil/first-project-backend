import { Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}
export type TStudent = {
  id: string
  user:Types.ObjectId
  password: string
  name: TUserName
  gender: 'Male' | 'Female'
  dateOfBirth?: string
  email: string
  contactNo: string
  bloodGroup: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  admissionSemester:Types.ObjectId
  profileImg?: string
  
  isDeleted: boolean
  
}

// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >

export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>
}
