import { EOL } from 'os'
import { isEmpty } from 'lodash'
import { inspect } from 'util'
import { injectable, inject } from 'inversify'
import { createLogger, Logger, transports, format } from 'winston'
import { Config } from '#/framework/infrastructure/config'
import { ILogger } from '#/business/modules/logger'

@injectable()
export class Log implements ILogger {
  get stream (): any {
    return {
      write: (message: string, encoding: string) => {
        this.logger.info(message.replace(/\n$/, ''))
      }
    }
  }
  private readonly logger: Logger

  constructor (@inject(Config) private config: Config) {
    const { combine, metadata, printf } = format
    this.logger = createLogger({
      level: this.config.logLevel || 'info',
      format: combine(
        metadata(),
        printf((info) => {
          let result = `${info.level}: `
          // tslint:disable-next-line: strict-type-predicates
          if (typeof info.message === 'string') {
            result += info.message
          } else {
            result += inspect(info.message, false, 5)
          }
          if (info.metadata && !isEmpty(info.metadata)) {
            result += EOL
            if (typeof info.metadata === 'string') {
              result += info.metadata
            } else {
              result += inspect(info.metadata, false, 5)
            }
          }
          return result
        })
      ),
      transports: [
        new transports.Console({
          handleExceptions: true
        })
      ],
      exitOnError: false
    })
  }

  public log (log: any, context?: any): void {
    this.logger.info(log, context)
  }

  public error (log: any, context?: any): void {
    this.logger.error(log, context)
  }

  public warn (log: any, context?: any): void {
    this.logger.warn(log, context)
  }

  public info (log: any, context?: any): void {
    this.logger.info(log, context)
  }

  public debug (log: any, context?: any): void {
    this.logger.debug(log, context)
  }

  public notice (log: any, context?: any): void {
    this.logger.notice(log, context)
  }

  public crit (log: any, context?: any): void {
    this.logger.crit(log, context)
  }

  public alert (log: any, context?: any): void {
    this.logger.alert(log, context)
  }

  public emerg (log: any, context?: any): void {
    this.logger.emerg(log, context)
  }
}
