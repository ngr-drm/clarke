import tap from 'tap';
import { Client } from 'undici';
import { server } from '../setup';

tap.test('smoke test', async (t) => {
  t.plan(2);
  const fastify = await server();

  await fastify.listen();

  const client = new Client('http://127.0.0.1:3000', {
    keepAliveTimeout: 10,
    keepAliveMaxTimeout: 10,
  });

  const response = await client.request({ method: 'GET', path: '/health' });
  const body = (await response.body.json()) as JSON;

  t.hasOwnProp(body, 'api');
  t.equal(response.statusCode, 200);

  client.close();
  fastify.close();
});
