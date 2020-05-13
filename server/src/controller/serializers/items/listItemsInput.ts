import { Validatable } from '#/business/modules/validatable'

export class ListItemsInput extends Validatable {
  userId!: string

  constructor (obj: Partial<ListItemsInput>) {
    super()
    Object.assign(this, obj)
  }
}
