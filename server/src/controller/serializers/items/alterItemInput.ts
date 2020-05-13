import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique
} from 'class-validator'
import { Validatable } from '#/business/modules/validatable'

export class AlterItemInput extends Validatable {
  // @IsNotEmpty()
  // @IsString()
  id!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  groups!: string[]

  userId!: string

  constructor (obj: Partial<AlterItemInput>) {
    super()
    Object.assign(this, obj)
  }
}
