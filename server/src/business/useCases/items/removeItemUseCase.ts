import { UseCase } from '#/business/useCase'
import { inject, injectable } from 'inversify'
import {
  IItemRepository,
  ItemRepositoryToken
} from '#/business/repositories/iItemRepository'

type Input = {
  id: string;
  userId: string;
}

@injectable()
export class RemoveItemUseCase extends UseCase<Input, void> {
  @inject(ItemRepositoryToken)
  private readonly itemRepository!: IItemRepository

  async exec (input: Input): Promise<void> {
    await this.itemRepository.delete(input.id, input.userId)
  }
}
