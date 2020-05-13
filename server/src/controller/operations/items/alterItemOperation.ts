import { Output } from '#/business/dto/output'
import { Operation } from '#/controller/operations/operation'
import { injectable, inject } from 'inversify'
import { AlterItemInput } from '#/controller/serializers/items/alterItemInput'
import { AlterItemUseCase } from '#/business/useCases/items/alterItemUseCase'

@injectable()
export class AlterItemOperation extends Operation<AlterItemInput, any> {
  @inject(AlterItemUseCase)
  private readonly alterItemUseCase!: AlterItemUseCase

  async run (input: AlterItemInput): Promise<Output<any>> {
    const item = await this.alterItemUseCase.exec({
      id: input.id,
      name: input.name,
      groups: input.groups,
      userId: input.userId
    })
    return new Output({
      data: item
    })
  }
}
