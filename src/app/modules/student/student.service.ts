import { error } from 'console'
import { TStudent } from './student.interface'
import { Student as Student } from './student.model'
import path from 'path'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}
const getSinglStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  //const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSinglStudentFromDB,
  deleteStudentFromDB,
}
