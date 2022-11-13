/*
 * @Author: shanzhilin
 * @Date: 2022-10-15 17:24:14
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-13 22:49:12
 */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { useLogin } from '@/store/login';

import FosterModal from '../FosterModal';

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
  const [fosterVisible, setFosterVisible] = useState(false);

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
    if (e.key !== 'foster') {
      navigate(e.key);
    } else {
      setFosterVisible(true);
    }
  };

  useEffect(() => {
    const path = pathname.includes('back') ? '/back' : pathname;
    setCurrent(path);
  }, [pathname]);

  useEffect(() => {
    if (!isLogin) {
      setTabs(_tabs);
      return;
    }
    if (isAdmin) {
      const _tabs = tabs.concat({
        label: '管理后台',
        key: '/back',
      });
      setTabs(_tabs);
    } else {
      const _tabs = tabs.concat({
        label: '我想寄养',
        key: 'foster',
      });
      setTabs(_tabs);
    }
  }, [isLogin]);

  return (
    <>
      <Menu
        className="flex-1"
        mode="horizontal"
        selectedKeys={[current]}
        items={tabs}
        onClick={onClick}
      />
      <FosterModal
        visible={fosterVisible}
        onClose={() => setFosterVisible(false)}
      />
    </>
  );
};

export default TopTab;
