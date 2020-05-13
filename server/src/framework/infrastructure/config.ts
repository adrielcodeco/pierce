import { injectable } from 'inversify'

@injectable()
export class Config {
  get port (): number {
    return JSON.parse(process.env.PORT || '4000')
  }

  get logLevel (): string {
    return process.env.LOG_LEVEL || 'info'
  }

  get useSwagger (): boolean {
    return JSON.parse(process.env.ENABLE_SWAGGER || 'false')
  }
}
