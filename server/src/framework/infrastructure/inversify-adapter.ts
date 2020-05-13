import { IocAdapter, Action, ClassConstructor } from 'routing-controllers'
import { Container } from 'inversify'

export class InversifyAdapter implements IocAdapter {
  constructor (private readonly container: Container) {}

  get<T> (someClass: ClassConstructor<T>, action?: Action): T {
    const childContainer = this.container.createChild()
    // childContainer
    //   .bind(API_SYMBOLS.ClientIp)
    //   .toConstantValue(action?.context.ip)
    return childContainer.resolve<T>(someClass)
  }
}
