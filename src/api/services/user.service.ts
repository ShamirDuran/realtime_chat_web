import { ApiAdapter } from '../adapter.api'
import { headerToken } from '../config.api'
import { GetByIdResponse } from '../responses'
import { GetAllResponse } from '../responses/user/getAll.response'

const api = new ApiAdapter()

export class UserService {
  /**
   * Retrieve a user by id
   * @param id User id
   * @returns User
   */
  static async getById(id: string) {
    return await api.get<GetByIdResponse>(`/users/${id}`, {
      headers: {
        Authorization: headerToken(),
      },
    })
  }

  /**
   * Retrieve all users
   * @param name Filter by name
   * @param onlyEnabled Filter only enabled users
   * @param page
   * @param limit
   * @returns User[]
   */
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
      headers: {
        Authorization: headerToken(),
      },
    })
  }
}
