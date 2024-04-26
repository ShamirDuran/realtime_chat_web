import { ApiAdapter } from '../adapter.api'
import { headerToken } from '../config.api'

const api = new ApiAdapter()

export class ChatService {
  /**
   * Search into chats by a search term. Could be a user name or a message
   * @param searchTerm
   * @return Chat[]
   */
  static async searchIntoChats(searchTerm: string) {
    return await api.get('/chats/search', {
      params: {
        searchTerm,
      },
      headers: {
        Authorization: headerToken(),
      },
    })
  }
}
