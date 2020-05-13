import { injectable } from 'inversify'
import { IUserRepository } from '#/business/repositories/iUserRepository'
import { User } from '#/domain/entites/user'
import { UserModel } from '../models/userModel'

@injectable()
export class UserRepository implements IUserRepository {
  async search (filter?: any): Promise<User[]> {
    return UserModel.find(filter)
  }

  async findOne (id: string): Promise<User | undefined> {
    return UserModel.findOne(id)
  }

  async findAll (): Promise<User[]> {
    return UserModel.find(UserModel)
  }

  async create (user: Partial<User>): Promise<User> {
    return UserModel.create(user).save()
  }

  async update (id: string, user: Partial<User>): Promise<void> {
    await UserModel.update(user.id!, user)
  }

  async delete (id: string): Promise<void> {
    await UserModel.delete(id)
  }
}
