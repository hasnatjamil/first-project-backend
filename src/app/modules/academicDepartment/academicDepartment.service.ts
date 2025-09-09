import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicFaculty } from './academicDepartment.model'

const createAcademicFacultyIntoDB = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicFaculty.create(payLoad)
  return result
}

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find()
  return result
}

const getSinglAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findOne({ id })
  //const result = await AcademicSemester.aggregate([{ $match: { id: id } }])
  return result
}

const updateAcademicFacultyIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  })

  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSinglAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
}
