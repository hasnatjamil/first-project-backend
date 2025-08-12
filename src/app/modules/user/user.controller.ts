import { Request, Response } from 'express'

import studentValidationSchema from '../student/student.validation'
import { UserServices } from './user.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    //console.log(studentData)
    const zodParseData = studentValidationSchema.parse(studentData)

    const result = await UserServices.createStudentIntoDB(zodParseData)

    res.status(200).json({
      success: true,
      message: 'Student is created Successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Wrong',
      error: error,
    })
  }
}

export const UserControllers = {
  createStudent,
}
