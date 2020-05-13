import { injectable } from 'inversify'
import { IItemRepository } from '#/business/repositories/iItemRepository'
import { Item } from '#/domain/entites/item'
import { ItemModel } from '../models/itemModel'

@injectable()
export class ItemRepository implements IItemRepository {
  async search (filter?: any): Promise<Item[]> {
    return ItemModel.find(filter)
  }

  async findOne (id: string, userId: string): Promise<Item | undefined> {
    return ItemModel.findOne({ id, userId })
  }

  async findAll (): Promise<Item[]> {
    return ItemModel.find(ItemModel)
  }

  async create (item: Partial<Item>): Promise<Item> {
    return ItemModel.create(item).save()
  }

  async update (id: string, userId: string, item: Partial<Item>): Promise<void> {
    await ItemModel.update({ id, userId }, item)
  }

  async delete (id: string, userId: string): Promise<void> {
    await ItemModel.delete({ id, userId })
  }
}
