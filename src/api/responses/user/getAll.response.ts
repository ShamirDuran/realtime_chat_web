import { User } from '../../models'
import { BaseResponse } from '../base.response'

export interface GetAllResponse extends BaseResponse {
  users: User[]
}
