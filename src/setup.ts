import multipart from '@fastify/multipart';
import Fastify from 'fastify';
import routes from './domain/http-workflows';

export const server = async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(multipart);
  await fastify.register(routes);

  return fastify;
};
