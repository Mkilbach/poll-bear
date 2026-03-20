import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get('/', async (_request, _reply) => {
    return { root: true }
  })
}

export default root
