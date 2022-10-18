import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';

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
  const loginSubmit = () => {
    login({
      phone,
      username,
    });
  };

  return (
    <Modal open={visible} onCancel={close} onOk={loginSubmit}>
      <Input
        placeholder="请输入用户名"
        onBlur={e => setUserName(e.target.value)}
      />
      <Input
        placeholder="请输入用户名"
        onBlur={e => setPhone(e.target.value)}
      />
    </Modal>
  );
};

export default LoginModal;
