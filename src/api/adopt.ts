/*
 * @Author: shanzhilin
 * @Date: 2022-11-09 22:21:55
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-12-31 22:52:00
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

// 创建一条宠物申请
export const createAdoptApi = (data?: CreateAdoptProps) =>
  request('/adopt/create', {
    method: 'post',
    data,
  });

// 查询宠物领养列表
export const queryAdoptListApi = (data?: any) =>
  request('/adopt/list', {
    method: 'post',
    data,
  });

// 删除一条宠物
export const delAdoptApi = (data?: any) =>
  request('/adopt/delete', {
    method: 'post',
    data,
  });

// 更新宠物信息
export const updatePetInfo = (data?: any) =>
  request('/adopt/update/info', {
    method: 'post',
    data,
  });
