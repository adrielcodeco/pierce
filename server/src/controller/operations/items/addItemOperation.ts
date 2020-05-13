import short from 'short-uuid'
import { Output } from '#/business/dto/output'
import { Operation } from '#/controller/operations/operation'
import { injectable, inject } from 'inversify'
import { AddItemInput } from '#/controller/serializers/items/addItemInput'
import { AddItemUseCase } from '#/business/useCases/items/addItemUseCase'

@injectable()
export class AddItemOperation extends Operation<AddItemInput, any> {
  @inject(AddItemUseCase)
  private readonly addItemUseCase!: AddItemUseCase

  async run (input: AddItemInput): Promise<Output<any>> {
    const item = await this.addItemUseCase.exec({
      id: short.generate(),
      name: input.name,
      groups: input.groups,
      userId: input.userId
    })
    return new Output({
      data: item
    })
  }
}
