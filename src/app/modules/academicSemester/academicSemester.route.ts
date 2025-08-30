import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidations } from './academicSemester.validation'

const router = express.Router()

// router.get('/get-all-students', StudentControllers.getAllStudents)
// router.get(
//   '/get-single-student/:studentId',
//   StudentControllers.getSingleStudent,
// )
// router.delete('/delete-student/:studentId', StudentControllers.deleteStudent)


router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

router.get('/get-all-semesters', AcademicSemesterControllers.getAllAcademicSemesters)

router.get(
  '/get-single-semester/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester
)
router.patch(
  '/get-single-semester/:semesterId',
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),AcademicSemesterControllers.updateAcademicSemester
)


export const AcademicSemesterRoutes = router
