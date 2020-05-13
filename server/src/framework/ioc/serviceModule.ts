import { ContainerModule, interfaces } from 'inversify'
import { container } from '#/business/ioc/container'
import { IJWTService, JWTServiceToken } from '#/business/services/iJWTService'
import { JWTService } from '#/framework/services/jwtService'

const serviceModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IJWTService>(JWTServiceToken).to(JWTService)
  }
)

container.load(serviceModule)

export { serviceModule }
