import { Schema, model } from 'mongoose'
import {
  TUserName,
  TStudent,
  TGuardian,
  TLocalGuardian,
  StudentModel,
} from './student.interface'
import validator from 'validator'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name must be given.'],
    maxlength: [20, 'First name must be within 20 characters.'],
    minlength: [2, 'First name must be at least 2 characters.'],
    trim: true,
    set: (value: string) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  },
  middleName: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name must be given.'],
    maxlength: [20, 'Last name must be within 20 characters.'],
    minlength: [2, 'Last name must be at least 2 characters.'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message:  '{VALUE} must contain only letters.',
    // },

    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: props => `${props.value} must contain only letters.`,
    },
  },
})
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
    //match: [/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'],
  },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true, trim: true },
  motherContactNo: {
    type: String,
    required: true,
    //match: [/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  contactNo: {
    type: String,
    required: true,
    //match: [/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'],
  },
  address: { type: String, required: true, trim: true },
})

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      unique: true,
      ref: 'User',
    },

    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: 'Gender must be either "Male" or "Female"',
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email.',
      },
    },
    contactNo: {
      type: String,
      required: true,
      //match: [/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'],
    },
    emergencyContactNo: {
      type: String,
      required: true,
      //match: [/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    presentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/, 'Invalid image URL'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
)

// creating the custom instance methods
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

//virtuals
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

studentSchema.pre('find', function (next) {
  //console.log(this)
  this.find({ isDeleted: { $ne: true } })
  next()
})

// studentSchema.pre('findOne', function (next) {
//   //console.log(this)
//   this.find({ isDeleted: { $ne: true } })
//   next()
// })
studentSchema.pre('aggregate', function (next) {
  //console.log(this)
  //console.log(this.pipeline());
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
