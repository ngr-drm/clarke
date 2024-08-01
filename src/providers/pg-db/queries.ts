import type { Persistence } from '../../domain/aggregate-root/contracts';
import type { Supplier } from '../../domain/aggregate-root/values-objects';
import { pgPool } from './connector';

async function dbConn() {
  return await pgPool().connect();
}

export const respository: Persistence = {
  async save(data: Supplier) {
    const client = await dbConn();

    const query = {
      text: `INSERT INTO suppliers ("name", "state", "totalCustomers", "minimumKwh", "costPerKwh", "averageRating")
          values($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [data.name, data.state, data.totalCustomers, data.minimumKwh, data.costPerKwh, data.averageRating],
    };
    try {
      const res = await client.query(query);
      return res.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    } finally {
      client.release();
    }
  },

  async findAll(minimumKwh: number) {
    const client = await dbConn();
    const query = {
      text: `SELECT * FROM suppliers WHERE "minimumKwh" < $1`,
      values: [minimumKwh],
    };
    try {
      const res = await client.query(query);

      return res.rows;
    } catch (err) {
      throw new Error(`${err}`);
    } finally {
      client.release();
    }
  },
};
