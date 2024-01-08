import { ApiAdapter } from '../adapter.api'
import { GetById } from '../responses'

const api = new ApiAdapter()

export class UserService {
  static async getById(id: string) {
    const token = localStorage.getItem('token')
    return await api.get<GetById>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
