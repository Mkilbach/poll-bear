import { FastifyPluginAsync } from 'fastify'

const example: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get('/', async (_request, _reply) => {
    return 'this is an example'
  })
}

export default example
