// import { IsNotEmpty, IsString } from 'class-validator'
import { Validatable } from '#/business/modules/validatable'

export class RemoveItemInput extends Validatable {
  // @IsNotEmpty()
  // @IsString()
  id!: string

  userId!: string

  constructor (obj: Partial<RemoveItemInput>) {
    super()
    Object.assign(this, obj)
  }
}
