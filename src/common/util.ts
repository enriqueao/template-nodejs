import crypto from 'crypto';

const SEM_VERSION_REGEX = '^(\\d+\\.)?(\\d+\\.)?(\\d+)$';

export const isValidVersion = (version: string) => {
  return version.match(SEM_VERSION_REGEX);
};

/**
 * kebab-case to UpperCamelCase
 * @param {String} word
 * @return {String}
 * */
export const toCamelCase = (word: string): string =>
  word.replace(/-./g, w => w[1].toUpperCase());

export const transformHeadersToCamelCase = (headers: {
  [k: string]: string | string[] | undefined;
}): { [k: string]: string | string[] } =>
  Object.entries(headers).reduce((r, [k, v]) => {
    return {
      ...r,
      [toCamelCase(k)]: v,
    };
  }, {});

export const hashKeyFn = <T>(data: T): string => {
  const objectToHash = JSON.stringify(data);
  return crypto.createHash('md5').update(objectToHash).digest('hex');
};

export const urlParams = (base: string, objectParams: {
  [k: string]: string;
}): string => {
  const params = new URLSearchParams(objectParams).toString();
  return base ? `${base}?${params}`: null;
}
