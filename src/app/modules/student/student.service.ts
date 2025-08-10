import { error } from 'console'
import { TStudent } from './student.interface'
import { Student as Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(student) create is a built in static method

  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User Already Exist!')
  }
  const result = await Student.create(studentData) //built in static method
  return result

  // const student = new Student(studentData) //create an instance

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User Already Exist!')
  // }
  // const result = await student.save()
  // return result
}

export const StudentServices = {
  createStudentIntoDB,
}
