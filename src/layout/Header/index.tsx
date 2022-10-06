import React from 'react';
import {useNavigate} from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-[0px] z-50 h-[70px] w-full bg-primary">
      <div onClick={() => navigate('/home')}>跳转</div>
    </div>
  );
};

export default Header;
