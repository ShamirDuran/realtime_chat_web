import { JwtPayload } from 'jwt-decode'

export interface JWTDecoded extends JwtPayload {
  uid: string
}
