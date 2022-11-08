/*
 * @Author: shanzhilin
 * @Date: 2022-11-06 14:44:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-07 22:50:19
 */
import React, { lazy } from 'react';

import { RouteItem } from './index';
import LazyLoad from './LazyLoad';
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const AdminList = lazy(() => import('@/pages/AdminList'));
const PetList = lazy(() => import('@/pages/PetList'));
const UserList = lazy(() => import('@/pages/UserList'));
const AdoptPets = lazy(() => import('@/pages/AdoptPets'))

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
    redirect: '/back/admin',
    children: [
      {
        path: '/back/admin',
        element: LazyLoad(<AdminList />),
      },
      {
        path: '/back/user',
        element: LazyLoad(<UserList />),
      },
      {
        path: '/back/pets',
        element: LazyLoad(<PetList />),
      },
      {
        path: '/back/adopt',
        element: LazyLoad(<AdoptPets />)
      }
    ],
  },
];

export default pageRoutes;
