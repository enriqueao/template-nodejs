import 'reflect-metadata';
import { v4 as uuidv4 } from "uuid";
import { v1Routes } from '@example-api/routes/v1';
import { config, startExpressServer } from '@example-api/platform/index';

const executorId = uuidv4();

export const app = startExpressServer([v1Routes], {
  requestId: executorId,
  port: config.port,
  host: config.host,
  basePath: '',
});
