import {
  IsNotEmpty,
  IsString,
  IsEmail,
  ValidateIf,
  MinLength
} from 'class-validator'
import { Validatable } from '#/business/modules/validatable'

export class SignupInput extends Validatable {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  firstName!: string

  @ValidateIf((o) => o.lastName)
  @IsString()
  lastName!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password!: string

  constructor (obj: Partial<SignupInput>) {
    super()
    Object.assign(this, obj)
  }
}
