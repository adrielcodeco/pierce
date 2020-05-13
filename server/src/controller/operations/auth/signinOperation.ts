import { Output } from '#/business/dto/output'
import { Operation } from '#/controller/operations/operation'
import { injectable, inject } from 'inversify'
import { SigninInput } from '#/controller/serializers/auth/signinInput'
import { SigninUseCase } from '#/business/useCases/auth/signinUseCase'

@injectable()
export class SigninOperation extends Operation<SigninInput, any> {
  @inject(SigninUseCase)
  private readonly signinUseCase!: SigninUseCase

  async run (input: SigninInput): Promise<Output<any>> {
    const token = await this.signinUseCase.exec({
      email: input.email,
      pwd: input.password
    })
    return new Output({
      data: { token }
    })
  }
}
