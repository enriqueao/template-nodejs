import { IJsonObject } from '@example-api/interfaces';

interface ICustomErrorParams {
  code: string;
  message?: string;
  vars?: IJsonObject;
  httpCode?: number;
}
export class CustomError extends Error {
  /**
   * Create custom errors
   *
   * @param code (string) error code registered in the cms (Strapi)
   * @param message (string) error custom message
   * @param vars (object) variables that can be interpolated in the error message
   */

  public code: string;
  public message: string;
  public vars: IJsonObject;
  public httpCode: number;

  constructor(public params: ICustomErrorParams) {
    super(params.code);

    this.code = params.code;
    this.message = params.message;
    this.vars = params.vars;
    this.httpCode = params.httpCode;
    this.name = CustomError.name;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
