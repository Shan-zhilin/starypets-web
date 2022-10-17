/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:40:15
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-17 22:40:16
 */
/*
* @Author: xinxu
 * @Date: 2022-07-31 16:56:59
 * @LastEditors: xinxu
 * @LastEditTime: 2022-07-31 16:57:12
 * @FilePath: /FX-gugu-selection-crm/src/utils/storage/storage.ts
 */
import { isString } from '../type';

const STORAGE = window.localStorage;

function serialize(v: unknown): string {
  return JSON.stringify(v);
}

function deserialize(v: string | null) {
  if (!isString(v)) {
    return undefined;
  }
  try {
    return JSON.parse(v);
  } catch (e) {
    return v || undefined;
  }
}

// 定义 storage 方法
export default {
  set(key: string, val: unknown): void {
    STORAGE.setItem(key, serialize(val));
  },
  get(key: string, def: unknown): unknown {
    const val = deserialize(STORAGE.getItem(key));
    return val === undefined ? def : val;
  },
  remove(key: string): void {
    STORAGE.removeItem(key);
  },
};