interface AuthProvider {
  isAuthenticated: boolean
  username: null | string
  signin(email: string, password: string): Promise<void>
  signout(): Promise<void>
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const authProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(email: string, password: string) {},
  async signout() {
    authProvider.isAuthenticated = false
    authProvider.username = ''
  },
}
