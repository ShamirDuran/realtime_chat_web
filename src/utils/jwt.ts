import { jwtDecode, JwtPayload } from 'jwt-decode'

/// Verify if token is valid and if not then return decoded token
export const verifyToken = <T extends JwtPayload>(token: string): T | false => {
  const decoded = jwtDecode<T>(token)

  if (!decoded.exp || decoded.exp < Date.now() / 1000) {
    return false
  }

  return decoded
}
