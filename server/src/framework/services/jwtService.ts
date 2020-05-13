import { injectable } from 'inversify'
import { IJWTService } from '#/business/services/iJWTService'
import jwt from 'jsonwebtoken'

@injectable()
export class JWTService implements IJWTService {
  private readonly secret = 'test'

  async generate (userId: string): Promise<string> {
    return jwt.sign({ userId }, this.secret)
  }

  async verify (token: string): Promise<string> {
    const decoded = jwt.verify(token, this.secret) as any
    return decoded.userId
  }
}
