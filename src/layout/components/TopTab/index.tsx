/*
 * @Author: shanzhilin
 * @Date: 2022-10-15 17:24:14
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-25 23:20:17
 */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { useLogin } from '@/store/login';

import './index.scss';

const _tabs = [
  {
    label: '首页',
    key: '/home',
  },
];

const TopTab: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState('/home');
  const [tabs, setTabs] = useState(_tabs);
  const [isLogin, isAdmin] = useLogin(state => [state.isLogin, state.isAdmin]);

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
    navigate(e.key);
  };

  useEffect(() => {
    const path = pathname.includes('back') ? '/back' : pathname;
    setCurrent(path);
  }, [pathname]);

  useEffect(() => {
    if (isAdmin) {
      const _tabs = tabs.concat({
        label: '管理后台',
        key: '/back',
      });
      setTabs(_tabs);
    } else {
      setTabs(_tabs);
    }
  }, [isLogin]);

  return (
    <Menu
      className="flex-1"
      mode="horizontal"
      selectedKeys={[current]}
      items={tabs}
      onClick={onClick}
    />
  );
};

export default TopTab;
