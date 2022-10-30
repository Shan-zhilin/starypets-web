/*
 * @Author: shanzhilin
 * @Date: 2022-10-17 22:21:03
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-20 23:22:40
 */
import axios from 'axios';

const HOST_URL = location.protocol + '//' + location.host + '/api';

export interface responseProps {
  success?: boolean;
  code?: number;
  msg?: string;
  data?: {
    [key: string]: any;
  };
  [key: string]: any;
}

// axios 请求拦截器处理请求数据
// axios.interceptors.request.use((config: any) => {
//   const token = window.localStorage.getItem('token');
//   config.headers.common['Authorization'] = 'Bearer ' + token; // 留意这里的 Authorization
//   config.headers.common['Content-Type'] =
//     'application/json;multipart/form-data;text/plain; charset=utf-8';
//   return config;
// });

const request = (
  url: string | string[],
  {
    method,
    data = {},
    response = 'json', //文件传输需要替换格式
  }: { method: string; data: any; response?: any }
) => {
  return new Promise((resolve: (value: responseProps) => void, reject) => {
    url = HOST_URL + url;
    if (url.indexOf('?') < 0) {
      url += '?_dt=' + Math.random();
    }

    if (
      data &&
      typeof data === 'object' &&
      (method === 'get' || method === 'delete')
    ) {
      for (const k in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(k)) {
          if (k === 'key' && (data[k] || '').indexOf("'") >= 0) {
            data[k] = data[k].replace(/\/'/g, '');
          }
          url += '&' + k + '=' + data[k];
        }
      }
    }
    let result;
    if (method === 'get') {
      result = axios.get(url, { responseType: response });
    } else if (method === 'delete') {
      result = axios.delete(url);
    } else if (method === 'post') {
      result = axios.post(url, data);
    } else if (method === 'put') {
      result = axios.put(url, data);
    }

    result?.then(
      r => {
        resolve(r.data);
      },
      r => {
        reject(r.data);
      }
    );
  });
};

export default request;
