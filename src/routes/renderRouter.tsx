/*
 * @Author: shanzhilin
 * @Date: 2022-10-06 18:51:54
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-15 15:39:17
 */
import React, { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteItem } from './index';

const renderRoute = (routes: RouteItem[]) => {
  return routes.map((route, index) => {
    let redirectEl: React.ReactNode | null = null;
    if (route.redirect) {
      redirectEl = (
        <Route
          key={route.path}
          path={route.path}
          element={<Navigate to={route.redirect} />}
        />
      );
    }

    const { children } = route;
    if (!children?.length) {
      return (
        <Fragment key={index}>
          {redirectEl && redirectEl}
          {route.element && (
            <Route key={route.path} path={route.path} element={route.element} />
          )}
        </Fragment>
      );
    }

    return (
      <Fragment key={index}>
        {redirectEl && redirectEl}
        {route.element ? (
          <Route key={route.path} path={route.path} element={route.element}>
            {renderRoute(children)}
          </Route>
        ) : (
          renderRoute(children)
        )}
      </Fragment>
    );
  });
};

interface RenderRouterProps {
  routes: RouteItem[];
}

const RenderRouter: React.FC<RenderRouterProps> = ({ routes }) => {
  if (!routes?.length) {
    return null;
  }
  return <Routes>{renderRoute(routes)}</Routes>;
};
export default RenderRouter;
