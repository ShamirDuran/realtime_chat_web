export interface User {
  uid: string
  firstName: string
  lastName: string
  about?: string
  avatar?: string
  email: string
  lastSeen?: Date
  status: string
}
