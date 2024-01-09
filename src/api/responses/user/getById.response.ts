import { User } from '../../models'
import { BaseResponse } from '../base.response'

export interface GetByIdResponse extends BaseResponse {
  user: User
}
