/*
 * @Author: shanzhilin
 * @Date: 2022-10-03 20:35:41
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-26 22:26:05
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginModal from '@/layout/components/LoginModal';
import { useLogin } from '@/store/login';

import './index.scss';
const Home: React.FC = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [isLogin] = useLogin(state => [state.isLogin]);
  const [petsList, setPetsList] = useState([1, 2, 3, 4, 5]);
  const navigate = useNavigate();

  const handelEnterDetail = (id: number) => {
    if (!isLogin) {
      setLoginVisible(true);
      return;
    }
    navigate(`/about/${id}`);
  };
  return (
    <div className="mx-auto mt-16 w-save">
      <div className="flex flex-wrap">
        {petsList.map(item => {
          return (
            <div
              className="five-box mb-16 w-[228px] cursor-pointer rounded-8 bg-white"
              onClick={() => {
                handelEnterDetail(item);
              }}>
              <img
                src="https://hkscda.com/img/intro_01.jpg"
                alt=""
                className="h-[228px] w-[228px] rounded-t-8 object-cover"
              />
              <div className="h-[160px] w-[160px]"></div>
            </div>
          );
        })}
      </div>
      <LoginModal visible={loginVisible} close={() => setLoginVisible(false)} />
    </div>
  );
};

export default Home;
