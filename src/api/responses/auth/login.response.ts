import { BaseResponse } from './base.response'

export interface LoginResponse extends BaseResponse {
  token: string
  uid: string
  firstName: string
  lastName: string
  email: string
}
