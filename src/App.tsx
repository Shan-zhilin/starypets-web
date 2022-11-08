/*
 * @Author: shanzhilin
 * @Date: 2022-10-03 20:22:08
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-08 23:51:02
 */

import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import routes from '@/routes/index';
import RenderRouter from '@/routes/renderRouter';

import { antdConfig } from './config';

const App = () => {
  return (
    <ConfigProvider {...antdConfig}>
      <Suspense>
        <HashRouter>
          <RenderRouter routes={routes} />
        </HashRouter>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
