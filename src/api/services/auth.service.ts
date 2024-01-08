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

    localStorage.setItem('token', resp.token)
    return resp
  }

  static async verifyAccount(token: string) {
    return await api.get<VerifyResponse>(`auth/verify-account/${token}`)
  }

  static async renewToken(token: string) {
    return await api.post<LoginResponse>('auth/renew-token', null, {
      headers: {
        Authorization: token,
      },
    })
  }
}
