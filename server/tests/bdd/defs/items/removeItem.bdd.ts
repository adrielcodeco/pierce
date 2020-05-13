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
import { addItem } from '../../lib/addItem'

const feature = loadFeature(
  path.resolve(__dirname, '../../features/items/removeItem.feature')
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

  scenario('Remove items', ({ given, when, then }) => {
    let item: any
    let response: any

    given('i have an access token', () => {
      expect(token).toBeDefined()
    })

    given('i have an item in database', async () => {
      item = await addItem(port, token, `remove item 1.${random.int(0, 10)}`, [
        'remove g1'
      ])
    })

    when('i send a delete request', async () => {
      response = await axios.delete(
        `http://localhost:${port}/items/${item.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'access-token': token
          },
          validateStatus: () => true
        }
      )
    })

    then('i will receive a list of items', () => {
      expect(response).toBeDefined()
      expect(response.status).toEqual(200)
      expect(response.data).toBeDefined()
      const body = response.data.data
      expect(body).toBeDefined()
      expect(body.success).toBeTruthy()
    })
  })
})
