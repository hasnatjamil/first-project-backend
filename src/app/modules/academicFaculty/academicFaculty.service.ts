import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'


const createAcademicSemesterIntoDB = async (
  playLoad: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.create(playLoad)
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
  payLoad: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  })

  return result
}

export const AcademicFacultyServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicFacultiesFromDB,
  getSinglAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
}
