import { UseCase } from '#/business/useCase'
import { inject, injectable } from 'inversify'
import {
  IUserRepository,
  UserRepositoryToken
} from '#/business/repositories/iUserRepository'

type Input = {
  email: string;
}

@injectable()
export class ResetPwdUseCase extends UseCase<Input, void> {
  @inject(UserRepositoryToken)
  private readonly userRepository!: IUserRepository

  async exec (input: Input): Promise<void> {
    const user = await this.userRepository.search({ email: input.email })
    const currentUser = user.find((i) => i)
    if (currentUser) {
      // send email to reset password
    }
    return
  }
}
