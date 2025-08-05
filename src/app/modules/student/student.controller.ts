import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import {studentValidationSchema} from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    console.log(studentData)
    const zodParseData = studentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDB(zodParseData)

    res.status(200).json({
      success: true,
      message: 'Student is created Successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'Student is created Successfully',
      error: error,
    })
  }
}

export const StudentControllers = {
  createStudent,
}
