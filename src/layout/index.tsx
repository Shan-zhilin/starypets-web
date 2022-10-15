/*
 * @Author: shanzhilin
 * @Date: 2022-10-06 18:12:15
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-15 15:47:51
 */
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import Menu from './Menu/index';
import Header from './Header';

const { Content, Sider } = Layout;

const NormalLayout: React.FC = () => {
  const [showMenu, setMenuShow] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    setMenuShow(pathname.includes('back'));
  }, [pathname]);
  return (
    <Layout>
      <Header />
      <Layout>
        {showMenu && (
          <Sider width={256} theme="light">
            <Menu />
          </Sider>
        )}
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NormalLayout;
