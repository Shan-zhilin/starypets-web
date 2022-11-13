/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:49:15
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-13 21:59:11
 */
import create from 'zustand';

import {
  getStorageLogin,
  getStorageUser,
  removeStorageLogin,
  removeStorageUser,
  setStorageLogin,
  setStorageUser,
} from '@/utils';

export interface UserInfo {
  token?: string;
  id?: number;
  headPic?: string;
  nickname?: string;
  mobile?: string;
  isAdmin?: boolean;
  // eslint-disable-next-line
  [key: string]: any;
}

interface LoginState {
  isAdmin: boolean;
  isLogin: boolean;
  login: (value: any) => Promise<void>;
  logout: () => Promise<void>;
}

const user = getStorageUser() as UserInfo;
const isLogin = getStorageLogin();

export const useLogin = create<LoginState>(set => ({
  isAdmin: !!user?.isAdmin,
  isLogin: isLogin,
  login: async value => {
    setStorageUser(value);
    setStorageLogin(true);
    set(() => ({ isLogin: true, isAdmin: value?.isAdmin }));
  },
  logout: async () => {
    set(() => ({ isLogin: false, isAdmin: false }));
    removeStorageUser();
    removeStorageLogin();
  },
}));
