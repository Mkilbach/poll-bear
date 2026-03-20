import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import AutoLoad from '@fastify/autoload'
import { FastifyPluginAsync } from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const options = {}

const app: FastifyPluginAsync = async (fastify, opts) => {
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

export default app
