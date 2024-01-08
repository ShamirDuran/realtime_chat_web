import { User } from '../../models'
import { BaseResponse } from '../base.response'

export interface GetById extends BaseResponse {
  user: User
}
