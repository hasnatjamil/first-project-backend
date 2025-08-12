import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: [true,'User Id is required'], unique:true},
    password: { type: String, required: [true,'Password is required'],maxlength:[20,'Password not more then 20 char long'] },
    needPasswordChange: { type: Boolean, required: true, default:true },
    role: { type: String, enum: ['admin', 'studnet', 'faculty'] },
    status: { type: String, enum: ['in-progress', 'blocked'],default:'in-progress' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)
export const User = model<TUser>('User',userSchema)
