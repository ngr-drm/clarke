import supertest from 'supertest';
import tap from 'tap';
import { server } from '../setup';

tap.test('smoke test', async (t) => {
  t.plan(1);
  const fastify = await server();

  t.teardown(() => fastify.close());

  await fastify.ready();

  const response = await supertest(fastify.server).get('/health').expect(200).expect('Content-Type', 'application/json; charset=utf-8');
  t.same(response.body, { api: 'running...' });
});

tap.test('should create a supplier', async (t) => {
  t.plan(1);
  const fastify = await server();

  t.teardown(() => fastify.close());

  await fastify.ready();

  const response = await supertest(fastify.server)
    .post('/supplier/create')
    .send({
      name: 'coelba',
      state: 'Bahia',
      minimumKwh: 1000,
      costPerKwh: 10.0,
      totalCustomers: 100,
      averageRating: 3,
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201);

  t.hasProp(response.body, 'id');
});
