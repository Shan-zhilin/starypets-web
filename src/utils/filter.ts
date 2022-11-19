/*
 * @Author: shanzhilin
 * @Date: 2022-11-19 15:19:24
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-19 15:28:53
 */
import { isDayjs } from 'dayjs';

import { isPlainObject } from './type';

const DEFAULT_OMITS = ['undefined', 'null', ''];

export const filterObject = (
  val: unknown,
  omit: any[] = DEFAULT_OMITS
): any => {
  if (!isPlainObject(val) || isDayjs(val)) return;
  return Object.keys(val as any).reduce((obj: any, key) => {
    const value = (val as any)[key];
    if (!omit.includes(value)) {
      obj[key] = isPlainObject(value) ? filterObject(value) : value;
    }
    return obj
  }, {});
};
