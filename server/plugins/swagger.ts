import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export default fp(async function (fastify, _opts) {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Poll Bear API',
        version: '1.0.0'
      }
    }
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/documentation',
  })
})
