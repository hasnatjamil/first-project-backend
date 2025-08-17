import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()


router.get('/get-all-students', StudentControllers.getAllStudents)
router.get(
  '/get-single-student/:studentId',
  StudentControllers.getSingleStudent,
)
router.delete('/delete-student/:studentId', StudentControllers.deleteStudent)

export const StudentRoutes = router
