import multipart from '@fastify/multipart';
import Fastify from 'fastify';
import routes from './domain/http-workflows';
import { pgPool } from './providers/pg-db/connector';
import { vars } from './vars';

(async function run() {
  const fastify = Fastify({ logger: true });

  try {
    const client = await pgPool().connect();
    client.release(true);
    fastify.log.info('successful database connection...');
  } catch (error) {
    fastify.log.error('database connection failure...');
    process.exit(1);
  }

  await fastify.register(multipart);
  await fastify.register(routes);

  fastify.listen({ port: vars.API_PORT | 3000, host: '0.0.0.0' }, (error, address) => {
    if (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  });
})();
