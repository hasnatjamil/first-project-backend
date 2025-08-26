import { TAcademicSemesterCode } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (
  playLoad: TAcademicSemesterCode,
) => {
  const result = await AcademicSemester.create(playLoad)
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
}
