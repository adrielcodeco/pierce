import { injectable, inject } from 'inversify'
import http from 'http'
import express, { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { createConnection } from 'typeorm'
import {
  useExpressServer,
  getMetadataArgsStorage,
  useContainer
} from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { Config } from '#/framework/infrastructure/config'
import { ILogger, LogToken } from '#/business/modules/logger'
import { container } from '#/business/ioc/container'
import { models } from '#/framework/models'
import { InversifyAdapter } from '#/framework/infrastructure/inversify-adapter'
import { Authorizer } from '#/framework/infrastructure/authorizer'
import { CurrentUser } from '#/framework/infrastructure/currentUser'
import { controllers } from '#/framework/routes'
const ormconfig = require('#/../ormconfig.json')

@injectable()
export class Server {
  private readonly app: Express
  private server: http.Server

  constructor (
    @inject(LogToken)
    private log: ILogger,
    @inject(Config)
    private config: Config
  ) {
    this.app = express()
    this.app.use(
      morgan(this.logFormatter, {
        stream: this.log.stream
      }) as any
    )
    this.app.use(helmet())
    this.app.disable('x-powered-by')
    useExpressServer(this.app, {
      controllers,
      classTransformer: true,
      authorizationChecker: Authorizer,
      currentUserChecker: CurrentUser
    })
    useContainer(new InversifyAdapter(container))
  }

  async run () {
    await this.initSwagger()
    await this.initDB()
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.config.port, () => {
          this.log.info(`server running on on port ${this.config.port}`)
          resolve()
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  async stop () {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }

  private logFormatter (
    tokens: any,
    req: express.Request,
    res: express.Response
  ): string {
    return JSON.stringify({
      type: 'request',
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      contentLength: tokens.res(req, res, 'content-length'),
      responseTime: (tokens['response-time'](req, res) || '-- ') + 'ms'
    })
  }

  private async initSwagger () {
    if (!this.config.useSwagger) {
      return
    }
    const storage = getMetadataArgsStorage()
    const schemas = validationMetadatasToSchemas()
    const swaggerSpec = routingControllersToSpec(
      storage,
      {},
      { components: { schemas }, info: { title: 'test', version: '1.0.0' } }
    )
    this.app.use('/api-docs', swaggerUi.serve)
    this.app.get('/api-docs', swaggerUi.setup(swaggerSpec))
  }

  private async initDB () {
    await createConnection(Object.assign({ entities: models }, ormconfig))
  }
}
