declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      HOST: string;

      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_TYPE: string;
      DB_POOL_SIZE: string;
      DB_SCHEMA_LOCKED: string;
      CONN_TIMEOUT: string;
      IDLE_TIMEOUT: string;

      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
      REDIS_TLS: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
