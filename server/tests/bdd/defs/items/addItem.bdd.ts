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
import { signin } from '../../lib/signin'

const feature = loadFeature(
  path.resolve(__dirname, '../../features/items/addItem.feature')
)

defineFeature(feature, (scenario) => {
  let server: Server
  let port: number
  let user: any
  let token: any

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
    user = await signup(port)
    token = await signin(port, user.email)
  })

  afterAll(async () => {
    await server.stop()
  })

  scenario('Add Item', ({ given, when, then }) => {
    let response: any

    given('i have an access token', async () => {
      expect(token).toBeDefined()
    })

    when(/^i send the (.*) and (.*) of the item$/, async (name, groups) => {
      response = await axios.post(
        `http://localhost:${port}/items`,
        {
          name: name ? name : undefined,
          groups: groups ? groups.split(',') : undefined
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'access-token': token
          },
          validateStatus: () => true
        }
      )
    })

    then(/^i will receive a response with (.*)$/, (msgs) => {
      expect(response).toBeDefined()
      expect(response.data).toBeDefined()
      const body = response.data
      expect(body).toBeDefined()
      if (!msgs) {
        expect(response.status).toEqual(201)
        expect(body.data).toBeDefined()
        expect(body.data.id).toBeDefined()
        return
      }
      expect(body.errors).toBeDefined()
      const messages = msgs.split(',')
      if (messages.includes('isString')) {
        expect(body.errors[0].constraints.isString).toBeDefined()
      }
      if (messages.includes('isNotEmpty')) {
        expect(body.errors[0].constraints.isNotEmpty).toBeDefined()
      }
      if (messages.includes('arrayUnique')) {
        expect(body.errors[0].constraints.arrayUnique).toBeDefined()
      }
      if (messages.includes('arrayNotEmpty')) {
        expect(body.errors[0].constraints.arrayNotEmpty).toBeDefined()
      }
      if (messages.includes('isArray')) {
        expect(body.errors[0].constraints.isArray).toBeDefined()
      }
    })
  })
})
