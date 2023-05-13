const { Client } = require("pg");
import config from '../../platform/config/index';

export declare type DBSQLBind = string | number | (string | number)[];

export type DBSQLArguments = {
  query: string;
  bind?: DBSQLBind;
};

export type DBReplyDataRow = {
  [key: string]: any;
}

let client;

export function connect(requestId?: string | null): void {
    client = new Client({
      host: config.db.host,
      port: config.db.port,
      user: config.db.userName,
      password: config.db.password,
      database: config.db.dbName,
    });
    client.connect((err) => {
        if (err) {
            console.error("connection error", err.stack);
        } else {
            console.log("connected");
        }
    });
}

export async function sql({ query, bind }: DBSQLArguments): Promise<DBReplyDataRow[]> {
  return await client.query(query, bind);
}
