import { Action } from 'routing-controllers'
import { IJWTService, JWTServiceToken } from '#/business/services/iJWTService'
import { container } from '#/business/ioc/container'

export async function Authorizer (action: Action, roles: string[]) {
  const accessToken = Reflect.get(action.request.headers, 'access-token')
  if (!accessToken) {
    return false
  }
  const jwtService = container.get<IJWTService>(JWTServiceToken)
  const userId = await jwtService.verify(accessToken)
  if (!userId) {
    return false
  }
  Reflect.set(action.request, 'userId', userId)
  return true
}
