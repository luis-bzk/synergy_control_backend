import { Server } from './presentation/server';
import { envs } from './config';
import { AppRoutes } from './presentation/routes';
import { PostgresDatabase } from './data';

(() => {
  main();
})();

async function main() {
  // Connection configuration to PostgreSQL
  await PostgresDatabase.connect({
    user: envs.DB_USER,
    host: envs.DB_HOST,
    database: envs.DB_DATABASE,
    password: envs.DB_PASSWORD,
    port: envs.DB_PORT,
  });

  await new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
