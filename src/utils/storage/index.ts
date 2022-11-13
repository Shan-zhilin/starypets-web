/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:40:08
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-13 22:01:24
 *
 */

import { UserInfo } from '@/store/login';

import storage from './storage';

// user 相关
const USER_KEY: string = '_STRAPTES_USER_INFO';
const USER_LOGIN: string = '_STRAPTES_USER_LOGIN';

export const getStorageUser = (): UserInfo =>
  storage.get(USER_KEY, {}) as UserInfo;

export const setStorageUser = (v: unknown): void => storage.set(USER_KEY, v);

export const removeStorageUser = (): void => storage.remove(USER_KEY);

export const setStorageLogin = (v: boolean): void => storage.set(USER_LOGIN, v);

export const getStorageLogin = (): boolean =>
  storage.get(USER_LOGIN, '') as boolean;

export const removeStorageLogin = (): void => storage.remove(USER_LOGIN);
