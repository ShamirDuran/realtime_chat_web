import { Chat, User } from '../../models'
import { BaseResponse } from '../base.response'

export interface SearchResponse extends BaseResponse {
  users: User[]
  chats: Chat[]
}
