/*
 * @Author: shanzhilin
 * @Date: 2022-10-30 22:39:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-16 21:59:10
 */
import request from '@/utils/request';

export interface CreateUserProps {
  username?: string;
  userphone?: string;
  password?: string;
  province?: string;
  city?: string;
  county?: string;
  page?: number;
  size?: number;
  [key: string]: any;
}

export const createUserApi = (data?: CreateUserProps) =>
  request('/user/create', {
    method: 'post',
    data,
  });

export const createAdminApi = (data?: CreateUserProps) =>
  request('/admin/createadmin', {
    method: 'post',
    data,
  });

export const getAdminListApi = (data?: CreateUserProps) =>
  request('/admin/list', {
    method: 'post',
    data,
  });
