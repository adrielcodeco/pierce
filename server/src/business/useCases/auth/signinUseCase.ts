import { UseCase } from '#/business/useCase'
import { inject, injectable } from 'inversify'
import bcrypt from 'bcryptjs'
import {
  IUserRepository,
  UserRepositoryToken
} from '#/business/repositories/iUserRepository'
import { FORBIDDEN } from '#/business/errors/authExceptions'
import { IJWTService, JWTServiceToken } from '../../services/iJWTService'

type Input = {
  email: string;
  pwd: string;
}

@injectable()
export class SigninUseCase extends UseCase<Input, string> {
  @inject(UserRepositoryToken)
  private readonly userRepository!: IUserRepository
  @inject(JWTServiceToken)
  private readonly jwtService!: IJWTService

  async exec (input: Input): Promise<string> {
    const user = await this.userRepository.search({ email: input.email })
    const currentUser = user.find((i) => i)
    if (!currentUser) {
      throw FORBIDDEN
    }
    const equal = await bcrypt.compare(input.pwd, currentUser.pwd)
    if (!equal) {
      throw FORBIDDEN
    }
    return this.jwtService.generate(currentUser.id)
  }
}
