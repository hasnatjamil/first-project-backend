import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payLoad)
  return result
}

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}

const getSinglAcademicDepartmentFromDB = async (_id: string) => {
  const result = await AcademicDepartment.findOne({ _id }).populate('academicFaculty')
  //const result = await AcademicSemester.aggregate([{ $match: { id: id } }])
  return result
}

const updateAcademicDepartmentIntoDB = async (
  _id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate({ id: _id }, payLoad, {
    new: true,
  })

  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSinglAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
}
