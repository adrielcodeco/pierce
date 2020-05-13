import { inject, injectable } from 'inversify'
import {
  JsonController,
  Post,
  Body,
  HttpCode,
  OnUndefined
} from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'
import { ResetPwdOperation } from '#/controller/operations/auth/resetPwdOperation'
import { ResetPwdInput } from '#/controller/serializers/auth/resetPwdInput'
import { SigninOperation } from '#/controller/operations/auth/signinOperation'
import { SigninInput } from '#/controller/serializers/auth/signinInput'
import { SignupOperation } from '#/controller/operations/auth/signupOperation'
import { SignupInput } from '#/controller/serializers/auth/signupInput'

@injectable()
@JsonController('/auth')
export class AuthController {
  @inject(ResetPwdOperation)
  private readonly resetPwdOperation!: ResetPwdOperation
  @inject(SigninOperation)
  private readonly signinOperation!: SigninOperation
  @inject(SignupOperation)
  private readonly signupOperation!: SignupOperation

  @HttpCode(201)
  @OnUndefined(422)
  @Post('/reset-pwd')
  async resetPwd (@Body() input: ResetPwdInput) {
    return this.resetPwdOperation.run(input)
  }

  @OpenAPI({
    description: 'Login'
  })
  @HttpCode(200)
  @Post('/signin')
  async signin (@Body() input: SigninInput) {
    return this.signinOperation.run(input)
  }

  @HttpCode(201)
  @Post('/signup')
  async signup (@Body() input: SignupInput) {
    return this.signupOperation.run(input)
  }
}
