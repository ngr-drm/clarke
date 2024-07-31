import type { FastifyReply, FastifyRequest } from 'fastify';
import { findSuppliers, saveSuppliers } from './domain/activities';
import type { Energy, Supplier } from './domain/aggregate-root/values-objects';

async function routes(fastify: any) {
  fastify.post('/supplier/create', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = request.body as Supplier;
      const supplier = await saveSuppliers(payload);

      reply.log.info('supplier saved successfully...');
      return reply.code(201).send(supplier);
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });

  fastify.post('/supplier/list', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = request.body as Energy;
      const suppliers = await findSuppliers(payload.monthlyConsumption);

      if (!suppliers.length) {
        reply.log.warn('not found suppliers...');
        return reply.code(404).send({ message: 'No supplier was found for this monthly consumption' });
      }
      reply.log.info('supplier saved successfully...');
      return reply.code(200).send(suppliers);
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });
}

export default routes;
