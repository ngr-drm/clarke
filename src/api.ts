import { pgPool } from './providers/pg-db/connector';
import { server } from './setup';
import { vars } from './vars';

(async function run() {
  const app = await server();

  try {
    const dbConn = await pgPool().connect();

    app.log.info('successful database connection...');
    dbConn.release(true);
  } catch (error) {
    app.log.error('database connection failure...');
    process.exit(1);
  }

  app.listen({ port: vars.API_PORT | 3000, host: '0.0.0.0' }, (error, address) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
    }
  });
})();
