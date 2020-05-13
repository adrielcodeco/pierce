import 'reflect-metadata'
import '#/framework/ioc'
import path from 'path'
import random from 'random'
import axios from 'axios'
import { defineFeature, loadFeature } from 'jest-cucumber'
import { Server } from '#/framework/infrastructure/server'
import { container } from '#/business/ioc/container'
import { Config } from '#/framework/infrastructure/config'

const feature = loadFeature(
  path.resolve(__dirname, '../../features/auth/signup.feature')
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

  scenario('Register a new user', ({ given, when, then }) => {
    let response: any

    given('i havent an account', () => {
      // does nothing
    })

    when('i send my email, firstName and password', async () => {
      const d1 = random.int(0, 9)
      const d2 = random.int(0, 9)
      const d3 = random.int(0, 9)
      const d4 = random.int(0, 9)
      const d5 = random.int(0, 9)
      response = await axios.post(
        `http://localhost:${port}/auth/signup`,
        {
          email: `test+${d1}${d2}${d3}${d4}${d5}@test.com`,
          firstName: 'test',
          password: '123456'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          validateStatus: () => true
        }
      )
    })

    then('my account will be created', () => {
      expect(response).toBeDefined()
      expect(response.status).toEqual(201)
      expect(response.data).toBeDefined()
      const body = response.data.data
      expect(body).toBeDefined()
      expect(body.success).toBeTruthy()
    })
  })

  scenario('Sinup with invalid email', ({ given, when, then }) => {
    let response: any

    given('i havent an account', () => {
      // does nothing
    })

    when('i send an invalid email, firstName and password', async () => {
      response = await axios.post(
        `http://localhost:${port}/auth/signup`,
        {
          email: `test+${random.int(1, 100)}@test`,
          firstName: 'test',
          password: '123456'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          validateStatus: () => true
        }
      )
    })

    then('my account will not be created', () => {
      expect(response).toBeDefined()
      expect(response.status).toEqual(400)
      expect(response.data).toBeDefined()
      const body = response.data
      expect(body).toBeDefined()
      expect(body.errors).toBeDefined()
      expect(body.errors[0].constraints.isEmail).toEqual(
        'email must be an email'
      )
    })
  })

  scenario(
    'Sinup password length must be more than 4 digits',
    ({ given, when, then }) => {
      let response: any

      given('i havent an account', () => {
        // does nothing
      })

      when(
        'i send my email, firstName and password with 3 digits',
        async () => {
          response = await axios.post(
            `http://localhost:${port}/auth/signup`,
            {
              email: `test+${random.int(1, 100)}@test.com`,
              firstName: 'test',
              password: '123'
            },
            {
              headers: {
                'Content-Type': 'application/json'
              },
              validateStatus: () => true
            }
          )
        }
      )

      then('my account will not be created', () => {
        expect(response).toBeDefined()
        expect(response.status).toEqual(400)
        expect(response.data).toBeDefined()
        const body = response.data
        expect(body).toBeDefined()
        expect(body.errors).toBeDefined()
        expect(body.errors[0].constraints.minLength).toEqual(
          'password must be longer than or equal to 4 characters'
        )
      })
    }
  )
})
