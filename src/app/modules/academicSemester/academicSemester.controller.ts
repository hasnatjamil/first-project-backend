import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res, next) => {
  //const { password, student: studentData } = req.body

  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester is created Successfully',
    data: result,
  })
})

const getAllAcademicSemesters = catchAsync(async (req, res, next) => {
  //const { password, student: studentData } = req.body

  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Semester Retrivd Successfully',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params
  const result =
    await AcademicSemesterServices.getSinglAcademicSemesterFromDB(semesterId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Student retived Successfully',
    data: result,
  })
})
const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Student retived Successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester
}
