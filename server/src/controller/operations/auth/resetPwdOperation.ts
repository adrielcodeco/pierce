import { Output } from '#/business/dto/output'
import { Operation } from '#/controller/operations/operation'
import { injectable, inject } from 'inversify'
import { ResetPwdInput } from '#/controller/serializers/auth/resetPwdInput'
import { ResetPwdUseCase } from '#/business/useCases/auth/resetPwdUseCase'

@injectable()
export class ResetPwdOperation extends Operation<ResetPwdInput, any> {
  @inject(ResetPwdUseCase)
  private readonly resetPwdUseCase!: ResetPwdUseCase

  async run (input: ResetPwdInput): Promise<Output<any>> {
    await this.resetPwdUseCase.exec({
      email: input.email
    })
    return new Output({
      data: { success: true }
    })
  }
}
