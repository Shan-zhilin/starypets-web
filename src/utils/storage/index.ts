/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:40:08
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-18 22:52:39
 *
 */

import { UserInfo } from '@/store/login';

import storage from './storage';

// user 相关
const USER_KEY: string = '_STRAPTES_USER_INFO';
const USER_NAME: string = '_STRAPTES_USER_NAME';

interface UserAccount {
  username: string;
}

export const getStorageUser = (): UserInfo =>
  storage.get(USER_KEY, {}) as UserInfo;

export const setStorageUser = (v: unknown): void => storage.set(USER_KEY, v);

export const removeStorageUser = (): void => storage.remove(USER_KEY);

export const setStorageLogin = (v: UserAccount): void =>
  storage.set(USER_NAME, v);

export const getStorageLogin = (): UserAccount =>
  storage.get(USER_NAME, {}) as UserAccount;

export const removeStorageLogin = (): void => storage.remove(USER_NAME);
