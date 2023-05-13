export interface IJsonObject {
  [key: string]: string;
}

export interface ICustomError extends Error {
  code: string;
  vars?: IJsonObject;
  httpCode: number
}
