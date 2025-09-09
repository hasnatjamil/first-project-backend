import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  //const { password, student: studentData } = req.body

  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created Successfully',
    data: result,
  })
})

const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  //const { password, student: studentData } = req.body

  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Faculties Retrivd Successfully',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params
  const result =
    await AcademicFacultyServices.getSinglAcademicFacultyFromDB(semesterId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'An Academic Faculty retived Successfully',
    data: result,
  })
})
const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    semesterId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'An Academic Faculty updated Successfully',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
