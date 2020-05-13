import { Action } from 'routing-controllers'
import { IJWTService, JWTServiceToken } from '#/business/services/iJWTService'
import { container } from '#/business/ioc/container'
import {
  IUserRepository,
  UserRepositoryToken
} from '#/business/repositories/iUserRepository'

export async function CurrentUser (action: Action) {
  const accessToken = Reflect.get(action.request.headers, 'access-token')
  const jwtService = container.get<IJWTService>(JWTServiceToken)
  const userId = await jwtService.verify(accessToken)
  const userRepo = container.get<IUserRepository>(UserRepositoryToken)
  return userRepo.findOne(userId)
}
