import type { Config } from './types';
const config: Config = {
  environment: process.env.ENVIRONMENT || "local",
  port: +process.env.PORT || 8080,
  host: process.env.HOST || "0.0.0.0",
  cache: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  },
  project: {
    appSecret: 'OI851HFX00000112'
  },
  auth: {
    secret: 'wordle',
    salts: 10,
  }
};

export default config;
