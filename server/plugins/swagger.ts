import fp from 'fastify-plugin';

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default fp(async function (fastify, _opts) {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: "Poll Bear API",
        version: "1.1.0",
      },
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: "/documentation",
  });

  fastify.addHook("onListen", async function () {
    console.log(`Swagger UI available at ${fastify.listeningOrigin}/documentation`);
  });
});
