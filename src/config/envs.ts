import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  JWT_SEED: get('JWT_SEED').required().asString(),

  FRONTEND_URL: get('FRONTEND_URL').required().asString(),

  DB_USER: get('DB_USER').required().asString(),
  DB_HOST: get('DB_HOST').required().asString(),
  DB_DATABASE: get('DB_DATABASE').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_PORT: get('DB_PORT').required().asPortNumber(),

  SMTP_HOST: get('SMTP_HOST').required().asString(),
  SMTP_PORT: get('SMTP_PORT').required().asString(),
  SMTP_USER: get('SMTP_USER').required().asString(),
  SMTP_PASS: get('SMTP_PASS').required().asString(),
};
