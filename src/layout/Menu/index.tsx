import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

const items = [
  {
    label: '管理员列表',
    key: '/back/admin',
  },
  {
    label: '宠物管理',
    key: '/back/user',
  },
  {
    label: '用户管理',
    key: '/back/pets',
  },
  {
    label: '招领申请',
    key: '/back/adopt'
  }
];

const MenuLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className='relative' style={{height: 'calc(100vh - 90px)'}}>
      <Menu defaultSelectedKeys={[pathname]} style={{ width: 256 }} mode="inline" theme="light" items={items} onClick={e => navigate(e.key)}/>
      <div className='w-full h-20 bg-white absolute -bottom-20' />
    </div>
  );
};

export default MenuLayout;
