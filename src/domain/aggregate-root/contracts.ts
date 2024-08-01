import type { Supplier } from './values-objects';

export interface Persistence {
  save(payload: Supplier): Promise<void>;
  findAll(minimumKwh: number): Promise<any[]>;
}
