export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type Student = {
  id: string
  name: {
    firstName: string
    middleName: string
    lastName: string
  }
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  parmanentAddress: string
  guardian: Guardian
}
