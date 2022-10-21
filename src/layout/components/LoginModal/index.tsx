/*
 * @Author: shanzhilin
 * @Date: 2022-10-15 17:23:10
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-21 23:00:28
 */
import React, { useState } from 'react';
import { Button, Input, message, Modal } from 'antd';

import { userLoginApi } from '@/api';
import { useLogin } from '@/store/login';

interface LoginProps {
  visible: boolean;
  close: () => void;
}

const LoginModal: React.FC<LoginProps> = ({ visible, close }) => {
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [login] = useLogin(state => [state.login]);

  // 登录
  const loginSubmit = async () => {
    const userInfo = await userLoginApi({
      phone,
      username,
      type: 0,
    });
    const { data, success, msg } = userInfo;
    if (success) {
      login(data);
      close()
    } else {
      message.error(msg);
    }
  };

  return (
    <Modal open={visible} onCancel={close} onOk={loginSubmit}>
      <Input
        placeholder="请输入用户名"
        onBlur={e => setUserName(e.target.value)}
      />
      <Input
        placeholder="请输入手机号"
        onBlur={e => setPhone(e.target.value)}
      />
    </Modal>
  );
};

export default LoginModal;
