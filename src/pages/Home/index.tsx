/*
 * @Author: shanzhilin
 * @Date: 2022-10-03 20:35:41
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-27 22:38:11
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Empty, message } from 'antd';

import { getPetsListApi } from '@/api';
import LoginModal from '@/layout/components/LoginModal';
import { useLogin } from '@/store/login';
import { formatImgList } from '@/utils';

import './index.scss';

const Home: React.FC = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [isLogin] = useLogin(state => [state.isLogin]);
  const [petsList, setPetsList] = useState([]);
  const navigate = useNavigate();

  const handelEnterDetail = ({id}:{id:number}) => {
    if (!isLogin) {
      setLoginVisible(true);
      return;
    }
    navigate(`/about/${id}`);
  };

  const getPetsList = async () => {
    const { data } = await getPetsListApi();
    const _list = data?.map((item: any) => {
      return {
        ...item,
        petpics: formatImgList(item.petpics),
        headpics: formatImgList(item.headpics),
      };
    });
    setPetsList(_list);
  };

  useEffect(() => {
    getPetsList();
  }, []);
  return (
    <div className="mx-auto mt-16 w-save">
      <div className="flex flex-wrap">
        {petsList.map((item: any) => {
          return (
            <div
              key={item.id}
              className="five-box mb-16 w-[228px] cursor-pointer rounded-8 bg-white"
              onClick={() => {
                handelEnterDetail(item);
              }}>
              <img
                src={item?.petpics[0] || 'https://hkscda.com/img/intro_01.jpg'}
                alt=""
                className="h-[228px] w-[228px] rounded-t-8 object-cover"
              />
              <div className="h-[160px] w-[160px]"></div>
            </div>
          );
        })}
      </div>
      {!petsList.length && <Empty description="暂无数据" />}
      <LoginModal visible={loginVisible} close={() => setLoginVisible(false)} />
    </div>
  );
};

export default Home;
