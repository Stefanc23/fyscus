'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';

const RouteLoader = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#0086ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default RouteLoader;
