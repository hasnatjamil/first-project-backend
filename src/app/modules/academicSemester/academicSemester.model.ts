import { model, Schema } from 'mongoose'

import bcrypt from 'bcrypt'
import config from '../../config'
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface'

// সব মাস
export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// সেমেস্টার নাম
export const AcademicSemesterName: TAcademicSemesterName['name'][] = [
  'Autumn',
  'Summer',
  'Fall',
]

// সেমেস্টার কোড
export const AcademicSemesterCode: TAcademicSemesterCode['code'][] = [
  '01',
  '02',
  '03',
]

const academicSemesterSchema = new Schema<TAcademicSemester>(
 {
    name: {
      type: String,
      enum:AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: Date, 
      required: true,
    },
    startMonth:{

    },
    endMonth:{

    },

  {
    timestamps: true,
  },
}
)

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
