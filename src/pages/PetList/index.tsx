/*
 * @Author: shanzhilin
 * @Date: 2022-11-06 14:44:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-20 22:26:38
 */
import React, { useEffect } from 'react';
import { Button, Table } from 'antd';

const PetList: React.FC = () => {
  const columns = [{
    title: ''
  }];
  return (
    <div className="p-20">
      <div className="rounded-[20px] bg-white p-20"></div>
      <div className="my-20 flex justify-end rounded-[20px] bg-white p-20">
        <Button type="primary" className="rounded-4">
          添加宠物
        </Button>
      </div>
      <div className="rounded-[20px] bg-white p-20"></div>
    </div>
  );
};

export default PetList;
