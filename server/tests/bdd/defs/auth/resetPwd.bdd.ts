import 'reflect-metadata'
import '#/framework/ioc'
import path from 'path'
import random from 'random'
import axios from 'axios'
import { defineFeature, loadFeature } from 'jest-cucumber'
import { Server } from '#/framework/infrastructure/server'
import { container } from '#/business/ioc/container'
import { Config } from '#/framework/infrastructure/config'
import { signup } from '../../lib/signup'

const feature = loadFeature(
  path.resolve(__dirname, '../../features/auth/resetPwd.feature')
)

defineFeature(feature, (scenario) => {
  let server: Server
  let port: number

  beforeAll(async () => {
    port = 4000 + random.int(0, 99)
    const config: Config = {
      port: port,
      logLevel: 'error',
      useSwagger: false
    }
    container.unbind(Config)
    container.bind<any>(Config).toConstantValue(config)
    server = container.get(Server)
    await server.run()
  })

  afterAll(async () => {
    await server.stop()
  })

  scenario('Reset password with success', ({ given, when, then }) => {
    let user: any
    let response: any

    given('i have an account', async () => {
      user = await signup(port)
    })

    when('i send my email', async () => {
      response = await axios.post(
        `http://localhost:${port}/auth/reset-pwd`,
        {
          email: user.email
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          validateStatus: () => true
        }
      )
    })

    then('my password will be reset', () => {
      expect(response).toBeDefined()
      expect(response.status).toEqual(201)
      expect(response.data).toBeDefined()
      const body = response.data.data
      expect(body).toBeDefined()
      expect(body.success).toBeTruthy()
    })
  })
})
