import fp from 'fastify-plugin';

import fastifyEnv from '@fastify/env';

const schema = {
  type: "object",
  required: ["MONGODB_URI"],
  properties: {
    MONGODB_URI: { type: "string" },
    PORT: { type: "string", default: "3000" },
    JWT_SECRET: { type: "string", default: "change-me-in-production" },
  },
};

declare module "fastify" {
  interface FastifyInstance {
    config: {
      MONGODB_URI: string;
      PORT: string;
      JWT_SECRET: string;
    };
  }
}

export default fp(async function (fastify) {
  await fastify.register(fastifyEnv, {
    schema,
    dotenv: true,
  });

  fastify.addHook('onListen', async () => {
    console.log(fastify.config);
  });
});
