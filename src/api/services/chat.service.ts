import { ApiAdapter } from '../adapter.api'
import { headerToken } from '../config.api'
import { SearchResponse } from '../responses'

const api = new ApiAdapter()

export class ChatService {
  /**
   * Search into chats by a search term. Could be a user name or a message
   * @param searchTerm
   * @return Chat[]
   */
  static async searchIntoChats(searchTerm: string) {
    return await api.get<SearchResponse>(`/chats/search/${searchTerm}`, {
      headers: {
        Authorization: headerToken(),
      },
    })
  }
}
