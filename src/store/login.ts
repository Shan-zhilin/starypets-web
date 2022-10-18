/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:49:15
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-18 22:53:35
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
  isLogin: boolean;
  login: (value: any) => Promise<void>;
  logout: () => Promise<void>;
}

const user = getStorageUser() as UserInfo;

export const useLogin = create<LoginState>(set => ({
  isLogin: !!user?.token,
  login: async value => {
    const data = await userLoginApi(value);
    console.log(data);
    // const { token } = data;
    // const userData = Object.assign(data.userInfo, { token });
    // setStorageUser(userData);
    set(() => ({ isLogin: true }));
  },
  logout: async () => {
    set(() => ({ isLogin: false }));
    removeStorageUser();
  },
}));
