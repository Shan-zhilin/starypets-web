/*
 * @Author: shanzhilin
 * @Date: 2022-10-15 22:24:38
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-17 23:00:03
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const isTrue = (value: unknown): value is true => value === true;

export const isArray = Array.isArray;

// eslint-disable-next-line
export const isFunction = (value: unknown): value is (...args: any[]) => any =>
  typeof value === 'function';

export const objectToString = Object.prototype.toString;

export const toTypeString = (value: unknown): string =>
  objectToString.call(value);

// eslint-disable-next-line
export const isPlainObject = (value: unknown): value is Record<any, any> =>
  toTypeString(value) === '[object Object]';
