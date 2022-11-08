/*
 * @Author: shanzhilin
 * @Date: 2022-10-03 20:35:41
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-07 22:30:46
 */
import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';

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

  // 进入详情
  const handelEnterDetail = ({ id }: { id: number }) => {
    if (!isLogin) {
      setLoginVisible(true);
      return;
    }
    navigate(`/about/${id}`);
  };

  // 数据获取
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

  // 领养
  const handelAdopt = (e: MouseEvent) => {
    if (!isLogin) {
      setLoginVisible(true);
      return;
    }
    e.stopPropagation();
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
              <div className="h-[180px] p-12">
                <div className="mb-10 text-13 text-gray">
                  品种：{item.variety}
                </div>
                <div className="mb-10 text-13 font-medium text-primary">
                  地址：
                  {`${item.province}省/${item.city}市/${item.county}区/县`}
                </div>
                <div className="mb-10 text-12">发现时间：{item.createtime}</div>
                <div className="mb-10 text-13">关注度：{item.attention}</div>
                <div
                  className="cursor-pointer rounded-8 bg-gradient-primary px-12 py-10 text-center text-16 font-medium text-white"
                  onClick={handelAdopt}>
                  我想领养
                </div>
              </div>
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
