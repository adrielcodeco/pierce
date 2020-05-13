import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique
} from 'class-validator'
import { Validatable } from '#/business/modules/validatable'

export class AddItemInput extends Validatable {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  groups!: string[]

  userId!: string

  constructor (obj: Partial<AddItemInput>) {
    super()
    Object.assign(this, obj)
  }
}
