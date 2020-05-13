import { ContainerModule, interfaces } from 'inversify'
import { container } from '#/business/ioc/container'
import { SigninUseCase } from '#/business/useCases/auth/signinUseCase'
import { SignupUseCase } from '#/business/useCases/auth/signupUseCase'
import { ResetPwdUseCase } from '#/business/useCases/auth/resetPwdUseCase'
import { AddItemUseCase } from '#/business/useCases/items/addItemUseCase'
import { AlterItemUseCase } from '#/business/useCases/items/alterItemUseCase'
import { ListItemsUseCase } from '#/business/useCases/items/listItemsUseCase'
import { RemoveItemUseCase } from '#/business/useCases/items/removeItemUseCase'

const useCaseModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(SigninUseCase).to(SigninUseCase)
    bind(SignupUseCase).to(SignupUseCase)
    bind(ResetPwdUseCase).to(ResetPwdUseCase)
    bind(AddItemUseCase).to(AddItemUseCase)
    bind(AlterItemUseCase).to(AlterItemUseCase)
    bind(ListItemsUseCase).to(ListItemsUseCase)
    bind(RemoveItemUseCase).to(RemoveItemUseCase)
  }
)

container.load(useCaseModule)

export { useCaseModule }
