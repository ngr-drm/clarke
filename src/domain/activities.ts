import fs from 'node:fs';
import { pipeline } from 'node:stream';
import util from 'node:util';
import { respository } from '../providers/pg-db/queries';
import type { Supplier } from './aggregate-root/values-objects';

export async function saveSuppliers(payload: Supplier) {
  return await respository.save(payload);
}

export async function findSuppliers(minimumKwh: number) {
  return await respository.findAll(minimumKwh);
}

export async function uploadFile(data: any) {
  const pump = util.promisify(pipeline);
  await pump(data.file, fs.createWriteStream(`./bucket/${new Date().getTime()}-${data.filename}`));
}
