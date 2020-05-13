import { User } from '#/domain/entites/user'

export const UserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  search (filter?: any): Promise<User[]>
  findOne (id: string): Promise<User | undefined>
  findAll (): Promise<User[]>
  create (user: Partial<User>): Promise<User>
  update (id: string, user: Partial<User>): Promise<void>
  delete (id: string): Promise<void>
}
