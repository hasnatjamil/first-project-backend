import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })

  if (isDepartmentExist) {
    throw new Error('This Depertment is already exist')
  }
  next()
})

// --- Pre middleware for findOne / findById ---
academicDepartmentSchema.post('findOne', async function (next) {
  // const isDepartmentExist = await this.model.findOne(this.getFilter());
  // if (!isDepartmentExist) {
  //   const error: any = new Error('Academic Department not found');
  //   error.statusCode = 404; // attach HTTP status code
  //   return next(error);
  // }

  const isDepartmentExist = await AcademicDepartment.findOne(this.getQuery())

  if (!isDepartmentExist) {
    throw new Error('This Depertment is not exist')
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartment.findOne(query)

  if (!isDepartmentExist) {
    throw new Error('This Depertment is not exist')
  }
  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
