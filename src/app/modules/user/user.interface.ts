export type TUser = {
  id: string
  password: string
  needPasswordChange: boolean
  role: 'admin' | 'studnet' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}
