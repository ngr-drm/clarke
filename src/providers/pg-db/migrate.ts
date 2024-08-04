import * as fs from 'node:fs';
import path from 'node:path';
import { pgPool } from './connector';

(async function migrate() {
  const dbConn = await pgPool().connect();
  try {
    const pathWithSqlFiles = path.join(__dirname, '/migrations');
    const fileNames = fs
      .readdirSync(pathWithSqlFiles, { withFileTypes: true })
      .filter((item) => !item.isDirectory() && item.name.toLowerCase().endsWith('.sql'))
      .map((item) => item.name);

    await dbConn.query('BEGIN');
    for (const fileName of fileNames) {
      const sql = fs.readFileSync(`${pathWithSqlFiles}/${fileName}`, 'utf8');
      await dbConn.query(sql);
    }

    await dbConn.query('COMMIT');

    console.info('migration done!');
  } catch (error) {
    await dbConn.query('ROLLBACK');
    console.error('migration failed: ', error);
  } finally {
    dbConn.release(true);
  }
})();
