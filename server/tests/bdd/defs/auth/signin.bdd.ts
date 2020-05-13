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
  path.resolve(__dirname, '../../features/auth/signin.feature')
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

  scenario('Signin with success', ({ given, when, then }) => {
    let user: any
    let response: any

    given('i have an account', async () => {
      user = await signup(port)
    })

    when('i send my email and password', async () => {
      response = await axios.post(
        `http://localhost:${port}/auth/signin`,
        {
          email: user.email,
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

    then('i will receive a token', () => {
      expect(response).toBeDefined()
      expect(response.status).toEqual(200)
      const body = response.data?.data
      expect(body).toBeDefined()
      expect(body.token).toBeDefined()
    })
  })

  scenario('Signin with wrong email', ({ given, when, then }) => {
    let user: any
    let response: any

    given('i have an account', async () => {
      user = await signup(port)
    })

    when('i send a wrong email and correct password', async () => {
      response = await axios.post(
        `http://localhost:${port}/auth/signin`,
        {
          email: user.email + '.br',
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

    then('i will not receive a token', () => {
      expect(response).toBeDefined()
      expect(response.status).toEqual(403)
    })
  })

  scenario('Signin with wrong password', ({ given, when, then }) => {
    let user: any
    let response: any

    given('i have an account', async () => {
      user = await signup(port)
    })

    when('i send a correct email and wrong password', async () => {
      response = await axios.post(
        `http://localhost:${port}/auth/signin`,
        {
          email: user.email,
          password: '654321'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          validateStatus: () => true
        }
      )
    })

    then('i will not receive a token', () => {
      expect(response).toBeDefined()
      expect(response.status).toEqual(403)
    })
  })

  scenario('Signin with invalid email', ({ given, when, then }) => {
    let response: any

    given('i have an account', async () => {
      // does nothing
    })

    when('i send an invalid email and password', async () => {
      response = await axios.post(
        `http://localhost:${port}/auth/signin`,
        {
          email: `test+${random.int(1, 100)}@test`,
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

    then('i will not receive a token', () => {
      expect(response).toBeDefined()
      expect(response.status).toEqual(400)
      expect(response.data).toBeDefined()
      const body = response.data
      expect(body).toBeDefined()
      expect(body.errors).toBeDefined()
      expect(body.errors[0].constraints.isEmail).toBeDefined()
    })
  })

  scenario(
    'Signin with password less than 4 digits',
    ({ given, when, then }) => {
      let user: any
      let response: any

      given('i have an account', async () => {
        user = await signup(port)
      })

      when('i send my email and password with 3 digits', async () => {
        response = await axios.post(
          `http://localhost:${port}/auth/signin`,
          {
            email: user.email,
            password: '123'
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            validateStatus: () => true
          }
        )
      })

      then('i will not receive a token', () => {
        expect(response).toBeDefined()
        expect(response.status).toEqual(400)
        expect(response.data).toBeDefined()
        const body = response.data
        expect(body).toBeDefined()
        expect(body.errors).toBeDefined()
        expect(body.errors[0].constraints.minLength).toBeDefined()
      })
    }
  )
})
