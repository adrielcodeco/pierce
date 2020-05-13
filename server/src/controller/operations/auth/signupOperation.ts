import { Output } from '#/business/dto/output'
import { Operation } from '#/controller/operations/operation'
import { injectable, inject } from 'inversify'
import { SignupInput } from '#/controller/serializers/auth/signupInput'
import { SignupUseCase } from '#/business/useCases/auth/signupUseCase'
import { genericException } from '#/business/errors/genericException'

@injectable()
export class SignupOperation extends Operation<SignupInput, any> {
  @inject(SignupUseCase)
  private readonly signupUseCase!: SignupUseCase

  async run (input: SignupInput): Promise<Output<any>> {
    try {
      await this.signupUseCase.exec({
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        pwd: input.password
      })
      return new Output({
        data: {
          success: true
        }
      })
    } catch (err) {
      if (err instanceof Output) {
        return err
      }
      console.error(err)
      return genericException('Internal server error')
    }
  }
}
