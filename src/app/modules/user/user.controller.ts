import { Request, Response, NextFunction } from 'express'

import studentValidationSchema from '../student/student.validation'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body

    //console.log(studentData)
    //const zodParseData = studentValidationSchema.parse(studentData)

    const result = await UserServices.createStudentIntoDB(password, studentData)

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created Successfully',
    //   data: result,
    // })
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created Successfully',
      data: result,
    })
  } catch (error: any) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message || 'Something Wrong',
    //   error: error,
    // })
    next()
  }
}

export const UserControllers = {
  createStudent,
}
