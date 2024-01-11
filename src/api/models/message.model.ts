import { Chat } from './chat.model'
import { User } from './user.model'

export interface Message {
  uid: string
  chat: Chat
  from: User
  to: User
  content: string
  type: string
  readBy: ReadBy[]
  forwared: boolean
  createdAt: Date
  deleted: boolean
}

interface ReadBy {
  user: User
  readAt: Date
}
