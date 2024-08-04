import type { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { findSuppliers, saveSuppliers, uploadFile } from '../domain/activities';
import { energyValidator, supplierValidator } from '../domain/aggregate-root/values-objects';

async function routes(fastify: any) {
  fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.code(200).send({ api: 'running...' });
    } catch (err) {
      reply.log.error(err);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });

  fastify.post('/supplier/create', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = supplierValidator.parse(request.body);
      const supplier = await saveSuppliers(payload);

      reply.log.info('supplier saved successfully...');
      return reply.code(201).send(supplier);
    } catch (err) {
      reply.log.error(err);
      if (err instanceof ZodError) {
        return reply.code(400).send({ message: err });
      }
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });

  fastify.post('/supplier/list', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = energyValidator.parse(request.body);
      const suppliers = await findSuppliers(payload.monthlyConsumption);

      if (!suppliers.length) {
        reply.log.warn('not found suppliers...');
        return reply.code(404).send({ message: 'No supplier was found for this monthly consumption' });
      }
      reply.log.info('supplier saved successfully...');
      return reply.code(200).send(suppliers);
    } catch (err) {
      reply.log.error(err);
      if (err instanceof ZodError) {
        return reply.code(400).send({ message: err });
      }
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });

  fastify.post('/supplier/avatar', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await request.file();
      await uploadFile(data);

      reply.log.info('file uploaded successfully...');
      return reply.code(204).send();
    } catch (err) {
      reply.log.error(err);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });
}

export default routes;
