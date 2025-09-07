import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

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
  const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester)

  if (!admissionSemester) {
    throw new Error('Something went wrong!')
  }
  userData.id = await generateStudentId(admissionSemester)

  const newUser = await User.create(userData) //built in static method

  if (Object.keys(newUser).length) {
    payLoad.id = newUser.id
    payLoad.user = newUser._id

    const newStudent = await Student.create(payLoad)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDB,
}
