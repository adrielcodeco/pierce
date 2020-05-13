import { IsNotEmpty, IsEmail } from 'class-validator'
import { Validatable } from '#/business/modules/validatable'

export class ResetPwdInput extends Validatable {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  constructor (obj: Partial<ResetPwdInput>) {
    super()
    Object.assign(this, obj)
  }
}
