import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // const result = await Student.create(student) create is a built in static method

  //   if (await Student.isUserExist(studentData.id)) {
  //     throw new Error('User Already Exist!')
  //   }

  //create user object
  const userData: Partial<TUser> = {}

  //if password not given, use default password

  userData.password = password || (config.default_password as string)

  userData.role = 'student'
  userData.id = '2030100001'

  const newUser = await User.create(userData) //built in static method

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id

    const newStudent = await Student.create(studentData)
    return newStudent
  }

  // const student = new Student(studentData) //create an instance

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User Already Exist!')
  // }
  // const result = await student.save()
  // return result
}

export const UserServices = {
  createStudentIntoDB,
}
