import { UseCase } from '#/business/useCase'
import { inject, injectable } from 'inversify'
import {
  IItemRepository,
  ItemRepositoryToken
} from '#/business/repositories/iItemRepository'
import { ItemView } from '#/business/dto/itemView'
import { mapItemToItemView } from '#/business/mapper/itemToItemView'

type Input = {
  id: string;
  name: string;
  groups: string[];
  userId: string;
}

@injectable()
export class AddItemUseCase extends UseCase<Input, ItemView> {
  @inject(ItemRepositoryToken)
  private readonly itemRepository!: IItemRepository

  async exec (input: Input): Promise<ItemView> {
    const item = await this.itemRepository.create({
      id: input.id,
      name: input.name,
      groups: input.groups,
      userId: input.userId
    })
    return mapItemToItemView(item)
  }
}
