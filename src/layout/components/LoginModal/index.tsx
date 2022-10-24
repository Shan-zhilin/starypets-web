/*
 * @Author: shanzhilin
 * @Date: 2022-10-15 17:23:10
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-24 22:57:53
 */
import React, { useState } from 'react';
import { Button, Input, message, Modal, Radio } from 'antd';

import { userLoginApi } from '@/api';
import { useLogin } from '@/store/login';

import './index.scss';
interface LoginProps {
  visible: boolean;
  close: () => void;
}

const LoginModal: React.FC<LoginProps> = ({ visible, close }) => {
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [login] = useLogin(state => [state.login]);
  const [userType, setUserType] = useState(0);

  // 登录
  const loginSubmit = async () => {
    if (!username || !phone) return message.error('请输入用户名或手机号')
    const userInfo = await userLoginApi({
      phone,
      username,
      type: userType,
    });
    const { data, success, msg } = userInfo;
    if (success) {
      login(data);
      close();
    } else {
      message.error(msg);
    }
  };

  return (
    <Modal
      className="login"
      width={460}
      open={visible}
      onCancel={close}
      onOk={loginSubmit}
      footer={null}>
      <p className="mt-16 text-center text-20 font-bold">登录</p>
      <Input
        className="my-16 rounded-8"
        size="large"
        placeholder="请输入用户名"
        onBlur={e => setUserName(e.target.value)}
      />
      <Input
        className="rounded-8"
        placeholder="请输入手机号"
        size="large"
        onBlur={e => setPhone(e.target.value)}
      />
      <Radio.Group
        className="mt-16"
        onChange={e => setUserType(e.target.value)}
        value={userType}>
        <Radio value={0}>管理员</Radio>
        <Radio value={1}>普通用户</Radio>
      </Radio.Group>
      <Button
        className="my-16 w-full rounded-8"
        size="large"
        type="primary"
        onClick={loginSubmit}>
        登录
      </Button>
    </Modal>
  );
};

export default LoginModal;
