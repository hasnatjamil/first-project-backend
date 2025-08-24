import { Request, Response, NextFunction, RequestHandler } from 'express'
import { StudentServices } from './student.service'
import { createStudentValidationSchema } from './student.validation'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students are retived Successfully',
    data: result,
  })
})

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params
  const result = await StudentServices.getSinglStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students are retived Successfully',
    data: result,
  })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted the student',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  deleteStudent,
  getSingleStudent,
}
