import React, { lazy } from 'react';

import Layout from '@/layout/index';

import LazyLoad from './LazyLoad';
import pageRoutes from './pageRoutes';
const NotFound = lazy(() => import('@/pages/404'));

export interface RouteItem {
  path: string;
  children?: RouteItem[];
  element?: React.ReactNode;
  redirect?: string;
}

const defaultRoutes: RouteItem[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/404',
    element: LazyLoad(<NotFound />),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const routes: RouteItem[] = [
  ...defaultRoutes,
  {
    path: '',
    element: <Layout />,
    children: pageRoutes,
  },
];

export default routes;
