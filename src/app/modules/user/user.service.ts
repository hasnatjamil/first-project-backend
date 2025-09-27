//New LOGIC
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

import httpStatus from 'http-status'
import { generateStudentId } from './user.utils'

// Service function: নতুন student create করার জন্য
const createStudentIntoDB = async (
  password: string | undefined,
  payLoad: TStudent,
) => {
  // userData অবজেক্ট তৈরি করা হচ্ছে যাতে নতুন User এর ডাটা থাকবে
  const userData: Partial<TUser> = {}

  // Student role assign করা হচ্ছে
  userData.role = 'student'

  // 👉 যদি password request থেকে না আসে, তাহলে default password use করবে
  userData.password = password || (config.default_password as string)

  // Admission semester validate করা হচ্ছে
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  )

  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong!')
  }

  // Transaction শুরু
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // Generate unique student ID (based on semester)
    userData.id = await generateStudentId(admissionSemester, session)

    //  Step-1: User collection এ নতুন User তৈরি
    const newUser = await User.create([userData], { session })
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    //  Step-2: Student payload এ user id এবং reference যোগ করা
    payLoad.id = newUser[0].id
    payLoad.user = newUser[0]._id

    //  Step-3: Student collection এ নতুন student তৈরি
    const newStudent = await Student.create([payLoad], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // Transaction commit (সব ঠিক থাকলে DB তে final save হবে)
    await session.commitTransaction()

    // প্রথম student অবজেক্ট return করা
    return newStudent[0]
  } catch (error) {
    
    // কোন error হলে পুরো transaction rollback করবে
    await session.abortTransaction()
    console.error('Error in createStudentIntoDB:', error) // debug log

    //throw error
  } finally {
    // session end করা হচ্ছে
    await session.endSession()
  }
}

export const UserServices = {
  createStudentIntoDB,
}


// OLD LOGIC
// import mongoose from 'mongoose'
// import config from '../../config'
// import AppError from '../../errors/AppError'
// import { AcademicSemester } from '../academicSemester/academicSemester.model'
// import { TStudent } from '../student/student.interface'
// import { Student } from '../student/student.model'
// import { TUser } from './user.interface'
// import { User } from './user.model'
// import { generateStudentId } from './user.utils'
// import httpStatus from 'http-status'

// const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
//   // const result = await Student.create(student) create is a built in static method

//   //   if (await Student.isUserExist(studentData.id)) {
//   //     throw new Error('User Already Exist!')
//   //   }

//   //create user object
//   const userData: Partial<TUser> = {}

//   //if password not given, use default password

//   userData.password = password || (config.default_password as string)

//   userData.role = 'student'

//   //find academic semester info
//   const admissionSemester = await AcademicSemester.findById(
//     payLoad.admissionSemester,
//   )

//   if (!admissionSemester) {
//     throw new AppError(400, 'Something went wrong!')
//   }

//   const session = await mongoose.startSession()
//   try {
//     session.startTransaction()
//     //set generated id
//     userData.id = await generateStudentId(admissionSemester)

//     const newUser = await User.create([userData], { session }) //built in static method
//     // creating new user transaction-1
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
//     }

//     payLoad.id = newUser[0].id
//     payLoad.user = newUser[0]._id

//     // creating student transaction-2
//     const newStudent = await Student.create([payLoad], { session })
//     if (!newStudent.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
//     }

//     await session.commitTransaction()
//     return newStudent[0]
//   } catch (error) {
//     await session.abortTransaction()

//     throw error
//   } finally {
//     await session.endSession()
//   }
// }

// export const UserServices = {
//   createStudentIntoDB,
// }
