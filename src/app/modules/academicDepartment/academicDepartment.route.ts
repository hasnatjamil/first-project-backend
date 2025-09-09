import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academicDepartment.validation'
import { AcademicFacultyControllers } from './academicDepartment.controller'

const router = express.Router()

// router.get('/get-all-students', StudentControllers.getAllStudents)
// router.get(
//   '/get-single-student/:studentId',
//   StudentControllers.getSingleStudent,
// )
// router.delete('/delete-student/:studentId', StudentControllers.deleteStudent)

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
)

router.get(
  '/get-all-faculties',
  AcademicFacultyControllers.getAllAcademicFaculties,
)

router.get(
  '/get-single-faculty/:semesterId',
  AcademicFacultyControllers.getSingleAcademicFaculty,
)
router.patch(
  '/update-faculty/:semesterId',
  validateRequest(
    AcademicFacultyValidation.updatAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
