import { Request } from 'express';

export type DataToken = {
  data: {
    userId: number;
    userName: string;
  };
};
export interface CustomRequest extends Request {
  requestId?: string;
  dataTokenUser?: DataToken | null;
  sourceApp?: string | null;
  versionApp?: string | null;
  accessToken?: string | null;
}

export interface IStartOptions {
  basePath: string;
  port: number;
  host: string;
  requestId: string;
  corsOrigin?: string | string[];
}
