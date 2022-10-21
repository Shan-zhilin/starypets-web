/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:49:15
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-21 22:57:23
 */
import create from 'zustand';

import { getStorageUser, removeStorageUser, setStorageUser} from '@/utils';

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

export const useLogin = create<LoginState>(set => ({
  isAdmin: !!user?.isAdmin,
  isLogin: !!user?.isAdmin,
  login: async value => {
    setStorageUser(value);
    set(() => ({ isLogin: true, isAdmin: value?.isAdmin }));
  },
  logout: async () => {
    set(() => ({ isLogin: false, isAdmin: false }));
    removeStorageUser();
  },
}));
