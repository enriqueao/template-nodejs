import express, {
  Application,
  NextFunction,
  RequestHandler,
  Response,
} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { v4 as uuidv4 } from "uuid";
import { connect, connectRedisClient } from "@example-api/config/db";
import { transformHeadersToCamelCase } from '@example-api/common';
import config from '../config';
import { CustomRequest, IStartOptions } from './types';
import { errorHandlerMiddleWare } from '../middlewares/error-handler';

/**
 * Bootstraps and start express application
 * @author Enrique Aguilar
 * @param handlers (RequestHandler) express Request handler functions
 * @param options (StartOptions) object to configure server behavior
 * @returns express application
 */
export const startExpressServer = (
  handlers: RequestHandler | RequestHandler[],
  options: IStartOptions
) => {
  const { basePath, port, host, requestId } = options;
  const app: Application = express();
  app.use((req: CustomRequest, res: Response, next: NextFunction) => {
    const { requestId, accessToken } = transformHeadersToCamelCase(req.headers);
    req.requestId = (requestId as string) || uuidv4();
    req.accessToken = accessToken as string;
    console.info(
      `[START] - Path: ${req.originalUrl}`,
      req.requestId
    );
    next();
  });
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(helmet());
  app.use(compression());

  app.use(basePath, handlers);

  app.use((err: Error, req: CustomRequest, res: Response, next: NextFunction) => {
    errorHandlerMiddleWare(err, req, res, next);
  });

  app.listen(port, host, async () => {
    // if postgres is available, init a connection pool for the server.
    if (config.db.host) {
      connect(requestId);
    }
    // if redis is available, init the connection to Redis for the server.
    // Use getRedisClient to get the client to perform operations on the Redis DB
    if (config.cache.host) {
      await connectRedisClient(
        {
          maxRetriesPerRequest: 3,
          retryStrategy(times: number) {
            return Math.min(times * 50, 2000);
          },
        },
        requestId
      );
    }
    console.info(
      `⚡️ [server]: Server is running at http://${host}:${port}`,
      "app",
      requestId
    );
  });

  return app;
};
