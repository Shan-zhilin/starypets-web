/*
 * @Author: shanzhilin
 * @Date: 2022-10-18 22:02:28
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-20 23:17:14
 */
import request from '@/utils/request';

export interface UserLoginProps {
  /*
   * 手机号
   */
  phone: string;
  /*
   * 用户名
   */
  username: string;
  [key: string]: any;
}

// 用户登录
export const userLoginApi = (data: UserLoginProps) =>
  request('/login', {
    method: 'post',
    data,
  });
