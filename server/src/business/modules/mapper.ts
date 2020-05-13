type Constructor<T> = { new (...args: any[]): T }

class Mapper<S, T> {
  private newTarget: T

  constructor (public source: S, public target: Constructor<T> | T) {
    this.newTarget = this.isInstanceOfT(target) ? new target() : target
  }

  map (fn: (s: S) => any, to: keyof T): Mapper<S, T> {
    Reflect.set(this.newTarget as Object, to, fn(this.source))
    return this
  }

  to (): T {
    return this.newTarget
  }

  private isInstanceOfT (target: any): target is Constructor<T> {
    return typeof target === 'function'
  }
}

export function from<S, T> (source: S, target: Constructor<T> | T) {
  return new Mapper<S, T>(source, target)
}
