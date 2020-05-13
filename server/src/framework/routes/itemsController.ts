import { inject, injectable } from 'inversify'
import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  OnUndefined,
  CurrentUser
} from 'routing-controllers'
import { AddItemOperation } from '#/controller/operations/items/addItemOperation'
import { AlterItemOperation } from '#/controller/operations/items/alterItemOperation'
import { ListItemsOperation } from '#/controller/operations/items/listItemsOperation'
import { RemoveItemOperation } from '#/controller/operations/items/removeItemOperation'
import { AddItemInput } from '#/controller/serializers/items/addItemInput'
import { AlterItemInput } from '#/controller/serializers/items/alterItemInput'
import { ListItemsInput } from '#/controller/serializers/items/listItemsInput'
import { RemoveItemInput } from '#/controller/serializers/items/removeItemInput'
import { User } from '#/domain/entites/user'

@injectable()
@JsonController('/items')
export class ItemsController {
  @inject(AddItemOperation)
  private readonly addItemOperation!: AddItemOperation
  @inject(AlterItemOperation)
  private readonly alterItemOperation!: AlterItemOperation
  @inject(ListItemsOperation)
  private readonly listItemsOperation!: ListItemsOperation
  @inject(RemoveItemOperation)
  private readonly removeItemOperation!: RemoveItemOperation

  @HttpCode(201)
  @OnUndefined(422)
  @Post()
  async addItem (
    @Body() input: AddItemInput,
    @CurrentUser({ required: true }) user: User
  ) {
    input.userId = user.id
    return this.addItemOperation.run(input)
  }

  @HttpCode(200)
  @Put('/:itemId')
  async alterItem (
    @Body() input: AlterItemInput,
    @Param('itemId') itemId: string,
    @CurrentUser({ required: true }) user: User
  ) {
    input.id = itemId
    input.userId = user.id
    return this.alterItemOperation.run(input)
  }

  @HttpCode(200)
  @Get()
  async listItems (
    @Body() input: ListItemsInput,
    @CurrentUser({ required: true }) user: User
  ) {
    input.userId = user.id
    return this.listItemsOperation.run(input)
  }

  @HttpCode(200)
  @Delete('/:itemId')
  async removeItem (
    @Body() input: RemoveItemInput,
    @Param('itemId') itemId: string,
    @CurrentUser({ required: true }) user: User
  ) {
    input.id = itemId
    input.userId = user.id
    return this.removeItemOperation.run(input)
  }
}
