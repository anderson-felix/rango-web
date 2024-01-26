import router, { NextRouter, useRouter } from 'next/router';

import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { useLoading } from '../Loading';

const CustomRouterContext = React.createContext(router as NextRouter);

export const CustomRouterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const nextRouter = useRouter();
  const { setLoadingConfig } = useLoading();

  useMemo(() => {
    const previousPush = nextRouter.push;

    nextRouter.push = async (...params) => {
      setLoadingConfig((cfg) => ({ ...cfg, isLoading: true }));
      return await previousPush.bind(nextRouter)(...params);
    };
  }, [nextRouter, setLoadingConfig]);

  return <CustomRouterContext.Provider value={nextRouter}>{children}</CustomRouterContext.Provider>;
};

export const useCustomRouter = () => useContext(CustomRouterContext);
