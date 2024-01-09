import { ApiAdapter } from '../adapter.api'
import { headerToken } from '../config.api'
import { GetByIdResponse } from '../responses'
import { GetAllResponse } from '../responses/user/getAll.response'

const api = new ApiAdapter()

export class UserService {
  static async getById(id: string) {
    return await api.get<GetByIdResponse>(`/users/${id}`, {
      headers: { ...headerToken },
    })
  }

  static async getAll(
    name?: string,
    onlyEnabled: boolean = true,
    page: number = 1,
    limit: number = 10,
  ) {
    return await api.get<GetAllResponse>(`/users`, {
      params: {
        name,
        onlyEnabled,
        page,
        limit,
      },
      headers: { ...headerToken },
    })
  }
}
