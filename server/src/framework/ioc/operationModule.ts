import { ContainerModule, interfaces } from 'inversify'
import { container } from '#/business/ioc/container'
import { SigninOperation } from '#/controller/operations/auth/signinOperation'
import { SignupOperation } from '#/controller/operations/auth/signupOperation'
import { ResetPwdOperation } from '#/controller/operations/auth/resetPwdOperation'
import { AddItemOperation } from '#/controller/operations/items/addItemOperation'
import { AlterItemOperation } from '#/controller/operations/items/alterItemOperation'
import { ListItemsOperation } from '#/controller/operations/items/listItemsOperation'
import { RemoveItemOperation } from '#/controller/operations/items/removeItemOperation'

const operationModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(SigninOperation).to(SigninOperation)
    bind(SignupOperation).to(SignupOperation)
    bind(ResetPwdOperation).to(ResetPwdOperation)
    bind(AddItemOperation).to(AddItemOperation)
    bind(AlterItemOperation).to(AlterItemOperation)
    bind(ListItemsOperation).to(ListItemsOperation)
    bind(RemoveItemOperation).to(RemoveItemOperation)
  }
)

container.load(operationModule)

export { operationModule }
