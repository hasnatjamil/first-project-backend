import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'

import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: [true, 'User Id is required'], unique: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password not more then 20 char long'],
    },
    needPasswordChange: { type: Boolean, required: true, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await User.findOne({ id })
  return existingUser
  
}

userSchema.pre('save', async function (next) {
  //console.log(this, 'This is pre hook;it will save data')

  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const User = model<TUser, UserModel>('User', userSchema)
