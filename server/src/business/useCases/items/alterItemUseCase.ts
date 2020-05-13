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
export class AlterItemUseCase extends UseCase<Input, ItemView> {
  @inject(ItemRepositoryToken)
  private readonly itemRepository!: IItemRepository

  async exec (input: Input): Promise<ItemView> {
    await this.itemRepository.update(input.id, input.userId, {
      name: input.name,
      groups: input.groups
    })
    const item = await this.itemRepository.findOne(input.id, input.userId)
    return mapItemToItemView(item!)
  }
}
