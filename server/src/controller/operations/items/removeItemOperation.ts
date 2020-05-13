import { Output } from '#/business/dto/output'
import { Operation } from '#/controller/operations/operation'
import { injectable, inject } from 'inversify'
import { RemoveItemInput } from '#/controller/serializers/items/removeItemInput'
import { RemoveItemUseCase } from '#/business/useCases/items/removeItemUseCase'

@injectable()
export class RemoveItemOperation extends Operation<RemoveItemInput, any> {
  @inject(RemoveItemUseCase)
  private readonly removeItemUseCase!: RemoveItemUseCase

  async run (input: RemoveItemInput): Promise<Output<any>> {
    await this.removeItemUseCase.exec({
      id: input.id,
      userId: input.userId
    })
    return new Output({
      data: { success: true }
    })
  }
}
