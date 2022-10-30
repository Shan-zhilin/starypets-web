/*
 * @Author: shanzhilin
 * @Date: 2022-10-27 22:42:20
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-27 22:43:34
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