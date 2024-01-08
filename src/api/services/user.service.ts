import { ApiAdapter } from '../adapter.api'
import { FindByIdResponse } from '../responses'

const api = new ApiAdapter()

export class UserService {
  static async findById(id: string) {
    const token = localStorage.getItem('token')
    return await api.get<FindByIdResponse>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
