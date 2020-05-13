import { UseCase } from '#/business/useCase'
import { inject, injectable } from 'inversify'
import {
  IItemRepository,
  ItemRepositoryToken
} from '#/business/repositories/iItemRepository'
import { ItemView } from '#/business/dto/itemView'
import { mapItemToItemView } from '#/business/mapper/itemToItemView'

type Input = {
  userId: string;
}

@injectable()
export class ListItemsUseCase extends UseCase<Input, ItemView[]> {
  @inject(ItemRepositoryToken)
  private readonly itemRepository!: IItemRepository

  async exec (input: Input): Promise<ItemView[]> {
    const items = await this.itemRepository.search({ userId: input.userId })
    return items.map((i) => mapItemToItemView(i))
  }
}
