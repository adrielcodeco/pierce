import { Output } from '#/business/dto/output'
import { Operation } from '#/controller/operations/operation'
import { injectable, inject } from 'inversify'
import { ListItemsInput } from '#/controller/serializers/items/listItemsInput'
import { ListItemsUseCase } from '#/business/useCases/items/listItemsUseCase'

@injectable()
export class ListItemsOperation extends Operation<ListItemsInput, any> {
  @inject(ListItemsUseCase)
  private readonly listItemsUseCase!: ListItemsUseCase

  async run (input: ListItemsInput): Promise<Output<any>> {
    const items = await this.listItemsUseCase.exec({
      userId: input.userId
    })
    return new Output({
      data: items
    })
  }
}
