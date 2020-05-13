import { UseCase } from '#/business/useCase'
import { inject, injectable } from 'inversify'
import short from 'short-uuid'
import bcrypt from 'bcryptjs'
import {
  IUserRepository,
  UserRepositoryToken
} from '#/business/repositories/iUserRepository'
import { User } from '#/domain/entites/user'
import { invalidException } from '../../errors/validationException'

@injectable()
export class SignupUseCase extends UseCase<Partial<User>, void> {
  @inject(UserRepositoryToken)
  private readonly userRepository!: IUserRepository

  async exec (input: Partial<User>): Promise<void> {
    const users = await this.userRepository.search({ email: input.email })
    if (users?.length > 0) {
      throw invalidException('email', 'this login is already in use')
    }
    await this.userRepository.create({
      id: short.generate(),
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      pwd: bcrypt.hashSync(input.pwd!)
    })
  }
}
