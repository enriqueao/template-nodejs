import { NextFunction, Response } from 'express';
import jwt from "jsonwebtoken";
import { CODE_ERRORS } from '@example-api/constants';
import config from '../config';
import { constants } from 'http2';
import { CustomError } from '../lib/class/general-error';
import { CustomRequest } from '../server';

const { HTTP_STATUS_UNAUTHORIZED } = constants;

export const validateToken = async (
  req: CustomRequest,
  _: Response,
  next: NextFunction
) => {
  try {
    if (!req.accessToken) {
      throw new CustomError({
        code: CODE_ERRORS.UNAUTHORIZED,
        httpCode: HTTP_STATUS_UNAUTHORIZED,
      });
    }
    req.dataTokenUser = jwt.verify(req.accessToken, config.auth.secret);
    next();
  } catch (error) {
    next(error);
  }
};
