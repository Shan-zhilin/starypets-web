import React,{Suspense} from 'react';

const LazyLoad = (children: React.ReactNode):React.ReactNode => {
  return <Suspense>{children}</Suspense>;
};

export default LazyLoad;
