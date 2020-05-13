import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator'
import { Validatable } from '#/business/modules/validatable'

export class SigninInput extends Validatable {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password!: string

  constructor (obj: Partial<SigninInput>) {
    super()
    Object.assign(this, obj)
  }
}
