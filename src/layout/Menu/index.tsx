import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

const items = [
  {
    label: '管理员列表',
    key: '/back/stage',
  },
  {
    label: '宠物管理',
    key: '/back/user',
  },
  {
    label: '用户管理',
    key: '/back/pets',
  },
];

const MenuLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  return (
    <div style={{ minHeight: 'calc(100vh - 70px)' }}>
      <Menu defaultSelectedKeys={[pathname]} style={{ width: 256 }} mode="inline" theme="light" items={items} onClick={e => navigate(e.key)}/>
    </div>
  );
};

export default MenuLayout;
