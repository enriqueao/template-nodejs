import { inspect } from 'util';

/** Runs all promises sequentially, storing the results in the accumulator. */
export const sequentialPromises = async <T>(
  promises: (() => Promise<T>)[],
  accumulator = []
) => {
  const [head, ...pendingPromises] = promises;
  if (!head) {
    return accumulator;
  }
  const result = await head();
  accumulator.push(result);
  return sequentialPromises(pendingPromises, accumulator);
};

/**
 * Memoizes the promise response of a function
 *
 * @param method (function) the original (async) function
 * @returns the memoized function
 */
export function memoizePromise(method: (...someArgs: any) => Promise<any>) {
  const cache: any = {};

  return async (...args: any[]) => {
    const argsKey = JSON.stringify(args);
    cache[argsKey] = cache[argsKey] || method.apply(this, args);

    return cache[argsKey];
  };
}

interface executeArrayPromisesOptions {
  errorDescriptionMessage?: string;
  applyFlat?: boolean;
}

/**
 * Execute array of promises pending and return array of promises executed successful
 *
 * @param promisesArray Array of promises pending for execute
 * @param options Object with options for execute promises
 * @returns Array of promises execute successful
 */
export const executeArrayPromises = async <T>(
  promisesArray: Promise<T>[],
  options: executeArrayPromisesOptions = {
    errorDescriptionMessage: 'Result rejected',
    applyFlat: false,
  }
) => {
  const promisesResult = await Promise.allSettled(promisesArray);
  const promisesExecutedSuccessful: Awaited<T>[] = [];
  promisesResult.forEach(result => {
    if (result.status === 'fulfilled' && result.value) {
      promisesExecutedSuccessful.push(result.value);
    } else {
      console.error(
        `${options.errorDescriptionMessage}`,
        inspect(result, { depth: 2 })
      );
    }
  });
  if (options.applyFlat) {
    return promisesExecutedSuccessful.flat();
  }
  return promisesExecutedSuccessful;
};
