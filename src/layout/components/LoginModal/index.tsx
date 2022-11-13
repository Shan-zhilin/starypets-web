/*
 * @Author: shanzhilin
 * @Date: 2022-10-15 17:23:10
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-13 21:25:11
 */
import React, { useState } from 'react';
import { Button, Input, message, Modal, Radio } from 'antd';

import { userLoginApi } from '@/api';
import { useLogin } from '@/store/login';

import RegisterModal from '../RegisterModal';

import './index.scss';
interface LoginProps {
  visible: boolean;
  close: () => void;
}

const LoginModal: React.FC<LoginProps> = ({ visible, close }) => {
  const [username, setUserName] = useState('');
  const [registerVisible, setRegVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [login] = useLogin(state => [state.login]);
  const [userType, setUserType] = useState(0);

  // 关闭弹窗
  const onClose = () => {
    setUserName('');
    setPhone('');
    setUserType(0);
    close();
  };

  // 登录
  const loginSubmit = async () => {
    if (!username || !phone) return message.error('请输入用户名或手机号');
    const userInfo = await userLoginApi({
      phone,
      username,
      type: userType,
    });
    const { data, success, msg } = userInfo;
    if (success) {
      login(data);
      onClose();
    } else {
      message.error(msg);
    }
  };

  return (
    <Modal
      className="login"
      width={460}
      open={visible}
      onCancel={onClose}
      onOk={loginSubmit}
      footer={null}>
      <p className="mt-16 text-center text-20 font-bold">登录</p>
      <Input
        className="my-16 rounded-8"
        size="large"
        placeholder="请输入用户名"
        value={username}
        onChange={e => setUserName(e.target.value)}
      />
      <Input
        className="rounded-8"
        placeholder="请输入手机号"
        size="large"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <div className="mt-16 flex items-center justify-between">
        <Radio.Group
          onChange={e => setUserType(e.target.value)}
          value={userType}>
          <Radio value={0}>管理员</Radio>
          <Radio value={1}>普通用户</Radio>
        </Radio.Group>
        <span
          className="cursor-pointer text-primary"
          onClick={() => setRegVisible(true)}>
          立即注册
        </span>
      </div>
      <Button
        className="my-16 w-full rounded-8"
        size="large"
        type="primary"
        onClick={loginSubmit}>
        登录
      </Button>
      <RegisterModal
        visible={registerVisible}
        onClose={() => setRegVisible(false)}
      />
    </Modal>
  );
};

export default LoginModal;
