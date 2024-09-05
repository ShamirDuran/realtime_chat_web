import { JWTDecoded } from '../../interfaces'
import { verifyToken } from '../../utils'
import { ApiAdapter } from '../adapter.api'
import { LoginResponse, RegisterResponse, VerifyResponse } from '../responses'

const api = new ApiAdapter()

export class AuthService {
  static async register(fullName: string, email: string, password: string) {
    const data = { fullName, email, password }
    return await api.post<RegisterResponse>('/auth/register', data)
  }

  static async login(email: string, password: string) {
    const data = { email, password }
    const resp = await api.post<LoginResponse>('auth/login', data)

    const decoded = verifyToken<JWTDecoded>(resp.token)

    localStorage.setItem('token', resp.token)
    decoded && localStorage.setItem('user_id', decoded.uid)
    return resp
  }

  static async verifyAccount(token: string) {
    return await api.get<VerifyResponse>(`auth/verify_account/${token}`)
  }

  static async forgotPassword(email: string) {
    return await api.post('auth/forgot_password', { email })
  }

  static async passwordReset(token: string, password: string) {
    const data = { password }

    return await api.post('auth/password_reset', data, {
      headers: {
        Authorization: token,
      },
    })
  }

  static async renewToken(token: string) {
    return await api.post<LoginResponse>('auth/renew_token', null, {
      headers: {
        Authorization: token,
      },
    })
  }
}
