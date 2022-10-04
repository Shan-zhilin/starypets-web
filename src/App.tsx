/*
 * @Author: shanzhilin
 * @Date: 2022-10-03 20:22:08
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-03 22:03:49
 */

import React, { Suspense } from 'react';
import { Button } from 'antd';

const App = () => {
  return (
    <Suspense fallback={<span>loading</span>}>
      <div className="text-[#dd76dd]">1111</div>
      <Button type="primary">ceshi</Button>
    </Suspense>
  );
};

export default App;
