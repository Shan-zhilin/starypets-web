/*
 * @Author: shanzhilin
 * @Date: 2022-11-09 22:21:55
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-12-29 22:36:58
 */
import request from '@/utils/request';

export interface CreateAdoptProps {
  name?: string;
  phone?: string;
  province?: string;
  city?: string;
  county?: string;
  address: string;
  hasexperience: number;
  adoptway: number;
  appointtime: string;
  [key: string]: any;
}

export const createAdoptApi = (data?: CreateAdoptProps) =>
  request('/adopt/create', {
    method: 'post',
    data,
  });

export const queryAdoptListApi = (data?: any) =>
  request('/adopt/list', {
    method: 'post',
    data,
  });

export const delAdoptApi = (data?: any) =>
  request('/adopt/delete', {
    method: 'post',
    data,
  });
