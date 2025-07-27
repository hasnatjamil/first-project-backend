import { Schema } from 'mongoose'
import { Student } from './student.interface'

const StudentSchema = new Schema<Student>({
  id: { type: String },
  name: {},
})
