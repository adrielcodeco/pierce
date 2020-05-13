export class Output<T> {
  status?: string
  message?: string
  code?: string
  httpCode?: number
  data?: T
  headers?: any
  constructor (obj: Partial<Output<T>>) {
    Object.assign(this, obj)
  }
}
