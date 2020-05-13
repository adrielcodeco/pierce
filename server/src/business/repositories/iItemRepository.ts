import { Item } from '#/domain/entites/item'

export const ItemRepositoryToken = Symbol.for('IItemRepository')

export interface IItemRepository {
  search (filter?: any): Promise<Item[]>
  findOne (id: string, userId: string): Promise<Item | undefined>
  findAll (): Promise<Item[]>
  create (item: Partial<Item>): Promise<Item>
  update (id: string, userId: string, item: Partial<Item>): Promise<void>
  delete (id: string, userId: string): Promise<void>
}
