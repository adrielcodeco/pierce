import { ContainerModule, interfaces } from 'inversify'
import { container } from '#/business/ioc/container'
import {
  IUserRepository,
  UserRepositoryToken
} from '#/business/repositories/iUserRepository'
import { UserRepository } from '#/framework/repositories/userRepository'
import {
  IItemRepository,
  ItemRepositoryToken
} from '#/business/repositories/iItemRepository'
import { ItemRepository } from '#/framework/repositories/itemRepository'

const repositoryModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IUserRepository>(UserRepositoryToken).to(UserRepository)
    bind<IItemRepository>(ItemRepositoryToken).to(ItemRepository)
  }
)

container.load(repositoryModule)

export { repositoryModule }
