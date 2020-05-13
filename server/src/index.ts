import 'reflect-metadata'
require('dotenv').config()
import '#/framework/ioc'
import { container } from '#/business/ioc/container'
import { Server } from '#/framework/infrastructure/server'

export async function start () {
  const server = container.get(Server)
  await server.run()
}
