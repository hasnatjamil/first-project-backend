import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  //const { password, student: studentData } = req.body

  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created Successfully',
    data: result,
  })
})

const getAllAcademicDepartments = catchAsync(async (req, res, next) => {
  //const { password, student: studentData } = req.body

  const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Department Retrivd Successfully',
    data: result,
  })
})

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params
  const result =
    await AcademicDepartmentServices.getSinglAcademicDepartmentFromDB(departmentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'An Academic Department retived Successfully',
    data: result,
  })
})
const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params
  const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
    departmentId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'An Academic Department updated Successfully',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
