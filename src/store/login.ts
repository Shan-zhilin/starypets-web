/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:49:15
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-17 23:00:11
 */
import create from 'zustand';
import {
  getStorageUser,
  setStorageUser,
  removeStorageUser,
  storage,
} from '@/utils';
// import { usersApi } from '@/api';

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
    // const data = await usersApi.usersLoginMobile(value);
    // const { token } = data;
    // const userData = Object.assign(data.userInfo, { token });
    // setStorageUser(userData);
    set(() => ({ isLogin: true }));
  },
  logout: async () => {
    // await usersApi.usersLogout({}, { hasLoading: false });
    set(() => ({ isLogin: false }));
    removeStorageUser();
    // storage.remove('_FX_GGYP-SELECTION_GOODS');
  },
}));
