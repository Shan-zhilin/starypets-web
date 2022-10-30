import request from '@/utils/request';

export interface CreateUserProps {
  username?: string;
  userphone?: string;
  password?: string;
  province?: string;
  city?: string;
  county?: string;
  [key: string]: any;
}

export const createUserApi = (data?: CreateUserProps) =>
request('/user/create', {
  method: 'post',
  data,
});
