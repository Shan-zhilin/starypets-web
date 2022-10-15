import React,{useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import type {MenuProps} from 'antd'
import './index.scss'

const tabs = [
  {
    label: '首页',
    key: '/home',
  },
  {
    label: '管理后台',
    key: '/back',
  },
];

const TopTab: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate()
  const [current, setCurrent] = useState('/home');

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
    navigate(e.key)
  };

  useEffect(() => {
    const path = pathname.includes('back') ? '/back' : pathname
    setCurrent(path)
  },[pathname])

  return <Menu  mode="horizontal" selectedKeys={[current]} items={tabs} onClick={onClick}/>;
};

export default TopTab;
