/*
 * @Author: shanzhilin
 * @Date: 2022-10-06 18:12:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-25 23:26:57
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';

import HomeIcon from '@/assets/homeIcon.svg';
import { useLogin } from '@/store/login';
import { getStorageUser } from '@/utils/storage';

import LoginModal from '../components/LoginModal';
import TopTab from '../components/TopTab';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [loginModalVisible, setLoginModal] = useState(false);
  const [isLogin, logout] = useLogin(state => [state.isLogin, state.logout]);
  const userInfo = getStorageUser();

  // 退出登录
  const handelLoginOut = () => {
    logout().then(() => navigate('/home'));
  };

  const loginContent = () => {
    return (
      <div
        className="flex w-[120px] cursor-pointer  items-center justify-center rounded-4 bg-white p-14"
        onClick={handelLoginOut}>
        <LogoutOutlined />
        <span className="ml-14">退出登录</span>
      </div>
    );
  };

  return (
    <>
      <div className="sticky top-[0px] z-50 h-[70px] w-full bg-white">
        <div className="mx-auto flex h-full w-[1200px] cursor-pointer items-center">
          <div className="flex items-center" onClick={() => navigate('/home')}>
            <img src={HomeIcon} className="w-30" />
            <div className="ml-4 rounded-full bg-gradient-primary px-12 py-6 text-white">
              宠物小窝
            </div>
          </div>

          <div className="flex flex-1 items-center justify-between pl-[40px]">
            <TopTab />
            {!isLogin && <div className='p-8' onClick={() => setLoginModal(true)}>登录</div>}
            {isLogin && (
              <Popover placement="bottom" content={loginContent()}>
                <span className="mr-8">{userInfo?.nickname}</span>
                <Avatar
                  src={
                    userInfo?.headPic || 'https://joeschmoe.io/api/v1/random'
                  }
                />
              </Popover>
            )}
          </div>
        </div>
      </div>
      <LoginModal
        visible={loginModalVisible}
        close={() => setLoginModal(false)}
      />
    </>
  );
};

export default Header;
