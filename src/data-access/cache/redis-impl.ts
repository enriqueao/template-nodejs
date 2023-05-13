import { injectable } from 'inversify';
import { getRedisClient } from '@example-api/config/db';
import { CacheService } from '@example-api/common';

@injectable()
export class RedisImpl implements CacheService {

  async getKeyTLL(key: string): Promise<number> {
    const client = getRedisClient();
    return await client.ttl(key);
  }

  async getByKey<T>(key: string): Promise<T | null> {
    const client = getRedisClient();
    const response = await client.get(key);
    if (!response) {
      return null;
    }
    try {
      return JSON.parse(response);
    } catch (err) {
      return response as unknown as T;
    }
  }

  async setByKey<T>(key: string, value: T, seconds?: number): Promise<void> {
    const expireTimeInSeconds = seconds ?? 20;
    const client = getRedisClient();
    await client.set(key, JSON.stringify(value), 'EX', expireTimeInSeconds);
  }

  memoize<T>(
    method: (...someArgs: unknown[]) => Promise<T>,
    ttl?: number
  ): (...someArgs: unknown[]) => Promise<T> {
    return async (...args) => {
      const recordKey = this.generateFunctionKey(method.name, args);
      const record = await this.getByKey<T>(recordKey);
      if (record && typeof record === 'string') {
        try {
          return JSON.parse(record);
        } catch (err) {
          return record;
        }
      } else if (record) {
        return record;
      }

      const response = await method.apply(this, args);

      if (response) {
        const responseForRedis = JSON.stringify(response);
        await this.setByKey(recordKey, responseForRedis, ttl);
      }

      return response;
    };
  }

  generateFunctionKey<T>(functionName: string, args?: T): string {

    if (Array.isArray(args) && args.length) {
      return `${functionName}-${JSON.stringify(args)}`;
    }

    if (typeof args === 'object' && Object.keys(args).length) {
      return `${functionName}-${JSON.stringify(args)}`;
    }

    return functionName;
  }

  async deleteByKey(key: string): Promise<void> {
    const client = getRedisClient();
    await client.del(key);
  }
}
