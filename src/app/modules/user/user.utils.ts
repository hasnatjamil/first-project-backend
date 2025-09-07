import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

const findLastStudentId = async () => {
  const lastStudentId = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastStudentId?.id ? lastStudentId.id : undefined
}

//year semester 4 digits number
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // const currentId = (await findLastStudentId()) || (0).toString()
  // let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0')

  //for fixing bug
  let currentId = (0).toString() // 0000 by default
  const lastStudentId = await findLastStudentId() //2030 01 0001
  

  const lastStudentSemesterCode = lastStudentId?.substring(4, 5) //01
  const lastStudentYear = lastStudentId?.substring(0, 4)  //2030

  const currentSemesterCode = payLoad.code //01
  const currentYear = payLoad.year  //2030

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6)  //0001
  }

  let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementedId = `${payLoad.year}${payLoad.code}${incrementedId}`
  return incrementedId
}
