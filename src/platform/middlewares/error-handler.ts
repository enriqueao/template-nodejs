import { ICustomError } from '@example-api/interfaces';
import { defaults } from '@example-api/constants';
import { constants } from 'http2';
import { ErrorRequestHandler, Response, NextFunction } from 'express';
import { CustomRequest } from '../server';
import { CustomError } from '../lib/class/general-error';

const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

const buildResponse = (error: ICustomError, translatedMessage: string) => {
  return {
    code: error.code,
    message: error.code ? translatedMessage : error.message,
  };
};

export const errorHandler = (
  error: CustomError,
  req: CustomRequest,
  res: Response
) => {
  try {
    console.error(error, req.requestId);
    const translatedMessage = error.message || defaults.ERROR_MESSAGE;
    const response = buildResponse(error, translatedMessage);
    return res
      .status(error.httpCode || HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(response);
  } catch (err) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json(err);
  }
};

export const errorHandlerMiddleWare: ErrorRequestHandler = (
  error: CustomError,
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  errorHandler(error, req, res);
};
