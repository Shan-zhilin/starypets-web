/*
 * @Author: shanzhilin
 * @Date: 2022-10-03 20:22:08
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-03 22:03:49
 */

import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

import routes from '@/routes/index';
import RenderRouter from '@/routes/renderRouter';

const App = () => {
  return (
    <Suspense>
      <HashRouter>
        <RenderRouter routes={routes} />
      </HashRouter>
    </Suspense>
  );
};

export default App;
