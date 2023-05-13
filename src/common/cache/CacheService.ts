export interface CacheService {
  getByKey<T>(key: string): Promise<T | null>;
  setByKey<T>(
    key: string,
    value: T,
    expireTimeInSeconds?: number
  ): Promise<void>;
  generateFunctionKey<T>(functionName: string, args?: T): string;
  memoize<T>(
    method: (...args: unknown[]) => Promise<T>,
    ttl?: number
  ): (...args: unknown[]) => Promise<T>;
  deleteByKey(key: string): Promise<void>;
  getKeyTLL(key: string): Promise<number>;
}
