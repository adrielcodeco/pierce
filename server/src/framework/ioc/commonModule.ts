import { ContainerModule, interfaces } from 'inversify'
import { container } from '#/business/ioc/container'
import { ILogger, LogToken } from '#/business/modules/logger'
import { Log } from '#/framework/infrastructure/log'
import { Config } from '#/framework/infrastructure/config'
import { Server } from '#/framework/infrastructure/server'

const commonModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(Config).to(Config).inSingletonScope()
    bind<ILogger>(LogToken).to(Log).inSingletonScope()
    bind(Server).to(Server).inSingletonScope()
  }
)

container.load(commonModule)

export { commonModule }
