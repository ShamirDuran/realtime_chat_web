import { Message } from './message.model'
import { User } from './user.model'

export interface Chat {
  uid: string
  participants: Participant[]
  messages: Message[]
  createdAt: Date
  group: boolean
  groupInfo?: GroupInfo
  events?: Event[]
}

interface Participant {
  user: User
  status: string
}

interface GroupInfo {
  name: string
  description: string
  avatar: string
}

interface Event {
  type: string
  createdAt: Date
}
