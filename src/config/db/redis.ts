import Redis from "ioredis";
import config from "../../platform/config/index";

let redisClient;

export function getRedisClient(): Redis.Redis {
    return redisClient;
}

export async function connectRedisClient(
  options?: Redis.RedisOptions,
  requestId?: string | null
): Promise<void> {

    let opts = {
      port: +config.cache.port,
      host: config.cache.host,
      password: config.cache.password,
    };
    redisClient = new Redis(opts);

    redisClient.on("connect", () => {
      console.info(
        "connect-redis-client",
        requestId || "not requestId was provided",
      );
    });
    redisClient.on("error", async (error) => {
      console.error(
        error,
        "connect-redis-client",
        requestId || "not requestId was provided",
        "cache-sdk"
      );
    });
}