import { inject, injectable } from "inversify";
import { SYMBOLS } from "@example-api/config/symbols";
import { Response } from "express";
import { constants } from "http2";

import { SigninUseCase } from "@example-api/domain";
import { CustomRequest } from "@example-api/platform/server/types";
import { CustomError } from "@example-api/platform/lib/class/general-error";
import { BaseController } from "../base-controller";

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

@injectable()
export class UserSigninController extends BaseController {
  private signin: SigninUseCase;

  public constructor(
    @inject(SYMBOLS.SigninUseCase)
    signin: SigninUseCase
  ) {
    super();
    this.signin = signin;
  }

  async execute(request: CustomRequest, response: Response): Promise<Response> {
    const { body } = request;

    const inputDto = {
      ...body,
      requestId: request.requestId,
    };
    const { userName, password } = body;
    if (!userName || !password) {
      throw new Error("missing fields");
    }

    try {
      const dataDto = await this.signin.execute(inputDto);

      response.header('access-token', dataDto.token);

      return this.ok(request, response, HTTP_STATUS_CREATED, dataDto);
    } catch (error) {
      return this.fail(
        request,
        response,
        HTTP_STATUS_INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}
