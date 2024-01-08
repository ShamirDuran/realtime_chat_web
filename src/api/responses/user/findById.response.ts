import { User } from '../../models'
import { BaseResponse } from '../base.response'

export interface FindByIdResponse extends BaseResponse {
  user: User
}
