/*
 * @Author: shanzhilin
 * @Date: 2022-10-06 18:12:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-15 15:40:06
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import TopTab from '../components/TopTab';

import HomeIcon from '@/assets/homeIcon.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-[0px] z-50 h-[70px] w-full bg-white">
      <div
        className="mx-auto flex h-full w-[1200px] cursor-pointer items-center">
        <div className="flex items-center" onClick={() => navigate('/home')}>
          <img src={HomeIcon} className="w-30"/>
          <div className="bg-gradient-primary text-white px-12 py-6 rounded-full ml-4">宠物小窝</div>
        </div>

        <div className='flex-1 flex justify-between items-center pl-[40px]'>
          <TopTab />
          <div>头像 昵称</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
