/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:49:15
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-20 23:22:49
 */
import create from 'zustand';

import { userLoginApi } from '@/api';
import {
  getStorageUser,
  removeStorageUser,
  setStorageUser,
  storage,
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
  isLogin:boolean;
  login: (value: any) => Promise<void>;
  logout: () => Promise<void>;
}

const user = getStorageUser() as UserInfo;

export const useLogin = create<LoginState>(set => ({
  isAdmin: !!user?.isAdmin,
  isLogin: !!user?.isAdmin,
  login: async value => {
    const userInfo = await userLoginApi(value);
    setStorageUser(userInfo?.data);
    set(() => ({ isLogin: true }));
  },
  logout: async () => {
    set(() => ({ isLogin: false }));
    removeStorageUser();
  },
}));
