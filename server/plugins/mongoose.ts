import fp from 'fastify-plugin'
import mongoose from 'mongoose'

export default fp(async function (fastify) {
  await mongoose.connect(fastify.config.MONGODB_URI)

  fastify.addHook('onClose', async () => {
    await mongoose.disconnect()
  })
})
