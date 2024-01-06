export interface User {
  uid: string
  firstName: string
  lastName: string
  about?: string
  avatar?: string
  email: string
  password: string
  passwordChangeAt?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  createdAt: Date
  updatedAt?: Date
  lastSeen?: Date
  verified: string
  socketId?: string
  status: string
  deleted: boolean
}
