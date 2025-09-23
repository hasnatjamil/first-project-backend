import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  // const result = await Student.create(student) create is a built in static method

  //   if (await Student.isUserExist(studentData.id)) {
  //     throw new Error('User Already Exist!')
  //   }

  //create user object
  const userData: Partial<TUser> = {}

  //if password not given, use default password

  userData.password = password || (config.default_password as string)

  userData.role = 'student'

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  )

  if (!admissionSemester) {
    throw new AppError(400, 'Something went wrong!')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //set generated id
    userData.id = await generateStudentId(admissionSemester)

    const newUser = await User.create([userData], { session }) //built in static method

    // creating new user transaction-1
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    payLoad.id = newUser[0].id
    payLoad.user = newUser[0]._id

    // creating student transaction-2
    const newStudent = await Student.create([payLoad], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    await session.commitTransaction()
    return newStudent[0]
  } catch (error) {
    await session.abortTransaction()

    throw error
  } finally {
    await session.endSession()
  }
}

export const UserServices = {
  createStudentIntoDB,
}
