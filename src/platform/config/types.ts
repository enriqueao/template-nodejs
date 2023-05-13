export type Config = {
  readonly environment: string;
  readonly port: number;
  readonly host: string;
  cache: {
    readonly host: string;
    readonly port: string;
    readonly password: string;
  };
  db: {
    readonly host: string;
    readonly port: string;
    readonly dbName: string;
    readonly userName: string;
    readonly password: string;
  };
  project: {
    readonly appSecret: string;
  };
  auth: {
    readonly secret: string;
    readonly salts: number;
  };
};
