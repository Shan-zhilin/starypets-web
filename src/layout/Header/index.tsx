/*
 * @Author: shanzhilin
 * @Date: 2022-10-06 18:12:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-18 22:57:10
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@/assets/homeIcon.svg';
import { useLogin } from '@/store/login';

import LoginModal from '../components/LoginModal';
import TopTab from '../components/TopTab';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [loginModalVisible, setLoginModal] = useState(false);

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
            <div onClick={() => setLoginModal(true)}>头像 昵称</div>
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
