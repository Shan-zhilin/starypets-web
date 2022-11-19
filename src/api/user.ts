/*
 * @Author: shanzhilin
 * @Date: 2022-10-30 22:39:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-19 19:40:03
 */
import request from '@/utils/request';

export interface UserProps {
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

export const createUserApi = (data?: UserProps) =>
  request('/user/create', {
    method: 'post',
    data,
  });

export const createAdminApi = (data?: UserProps) =>
  request('/admin/createadmin', {
    method: 'post',
    data,
  });

export const getAdminListApi = (data?: UserProps) =>
  request('/admin/list', {
    method: 'post',
    data,
  });

export const delAdminApi = (data?: UserProps) =>
  request('/admin/delete', {
    method: 'post',
    data,
  });

export const updateAdminApi = (data?: UserProps) =>
  request('/admin/update/info', {
    method: 'post',
    data,
  });
