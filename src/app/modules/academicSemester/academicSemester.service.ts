import { academicSemesterNameCodeMapper } from './academicSemester.constent'
import { TAcademicSemesterCode } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (
  playLoad: TAcademicSemesterCode,
) => {
  if (academicSemesterNameCodeMapper[playLoad.name] !== playLoad.code) {
    throw new Error('Invalid Semester Code')
  }
  const result = await AcademicSemester.create(playLoad)
  return result
}

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find()
  return result
}

const getSinglAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ id })
  //const result = await AcademicSemester.aggregate([{ $match: { id: id } }])
  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicSemesterCode>,
) => {
  if (
    payLoad.name &&
    payLoad.code &&
    academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code
  ) {
    throw new Error('Invalid Semester Code')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  })

  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSinglAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
