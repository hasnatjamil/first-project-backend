import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controller'


const router = express.Router()

// router.get('/get-all-students', StudentControllers.getAllStudents)
// router.get(
//   '/get-single-student/:studentId',
//   StudentControllers.getSingleStudent,
// )
// router.delete('/delete-student/:studentId', StudentControllers.deleteStudent)

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)

router.get(
  '/get-all-departments',
  AcademicDepartmentControllers.getAllAcademicDepartments,
)

router.get(
  '/get-single-department/:semesterId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
)

router.patch(
  '/update-department/:semesterId',
  validateRequest(
    AcademicDepartmentValidation.updatAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
)

export const AcademicDeparmentRoutes = router
