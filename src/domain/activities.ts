import { respository } from '../providers/pg-db/queries';
import type { Supplier } from './aggregate-root/values-objects';

export async function saveSuppliers(payload: Supplier) {
  return await respository.save(payload);
}

export async function findSuppliers(minimumKwh: number) {
  return await respository.findAll(minimumKwh);
}
