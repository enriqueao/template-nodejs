import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { errorHandler } from '@example-api/platform/middlewares/error-handler';
import { CustomError } from '@example-api/platform/lib/class/general-error';
import { CustomRequest } from '../platform';

@injectable()
export abstract class BaseController {
  public abstract execute(
    request: Request,
    response: Response
  ): Promise<Response>;

  protected ok<T>(
    req: CustomRequest,
    res: Response,
    httpCode: number,
    dto?: T
  ): Response {
    console.info(
      `[END] - Path: ${req.originalUrl}`,
      BaseController.name,
      req.requestId
    );
    if (dto) {
      res.type('application/json');
      return res.status(httpCode).json(dto);
    }

    return res.sendStatus(httpCode);
  }

  protected fail(
    req: CustomRequest,
    res: Response,
    httpCode: number,
    error: CustomError
  ): Response {
    if (!error.httpCode) {
      error.httpCode = httpCode;
    }
    console.info(
      `[END] - Path: ${req.originalUrl}`,
      BaseController.name,
      req.requestId
    );
    return errorHandler(error, req, res);
  }
}
