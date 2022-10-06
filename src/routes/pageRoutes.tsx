import React, { lazy } from 'react';

import { RouteItem } from './index';
import LazyLoad from './LazyLoad';
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const BackStage = lazy(() => import('@/pages/BackStage'));
const BackStage2 = lazy(() => import('@/pages/BackStage2'));
const BackStage3 = lazy(() => import('@/pages/BackStage3'));

const pageRoutes: RouteItem[] = [
  {
    path: '/home',
    element: LazyLoad(<Home />),
  },
  {
    path: '/about/:itemId',
    element: LazyLoad(<About />),
  },
  {
    path: '/back',
    redirect: '/back/stage',
    children: [
      {
        path: '/back/stage',
        element: LazyLoad(<BackStage />),
      },
      {
        path: '/back/user',
        element: LazyLoad(<BackStage2 />),
      },
      {
        path: '/back/pets',
        element: LazyLoad(<BackStage3 />),
      },
    ],
  },
];

export default pageRoutes;
