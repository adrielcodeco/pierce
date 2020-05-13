import { from } from '#/business/modules/mapper'
import { ItemView } from '#/business/dto/itemView'
import { Item } from '#/domain/entites/item'

export function mapItemToItemView (item: Item, itemView?: ItemView): ItemView {
  return from(item, itemView || ItemView)
    .map((s) => s.id, 'id')
    .map((s) => s.name, 'name')
    .map((s) => s.groups, 'groups')
    .to()
}
