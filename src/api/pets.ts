/*
 * @Author: shanzhilin
 * @Date: 2022-10-27 22:42:20
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-12-27 22:28:57
 */
import request from '@/utils/request';

export interface GetPetsProps {
  /*
   * id
   */
  id?: string | number;
  [key: string]: any;
}

export const getPetsListApi = (data?: GetPetsProps) =>
  request('/pets/getpets', {
    method: 'post',
    data,
  });

// 宠物管理列表
export const getPetsManageListApi = (data?: GetPetsProps) =>
  request('/pets/list', {
    method: 'post',
    data,
  });

// 删除宠物
export const delPetsApi = (data?: GetPetsProps) =>
  request('/pet/delete', {
    method: 'post',
    data,
  });

// 添加一条宠物
export const addPetApi = (data?: GetPetsProps) =>
  request('/pets/createpet', {
    method: 'post',
    data,
  });
