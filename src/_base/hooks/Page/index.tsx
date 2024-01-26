import Head from 'next/head';
import { PropsWithChildren, createContext, useCallback, useContext, useEffect } from 'react';

import { validateSession } from '@/_base/services/auth';
import { PageWrapper } from '@/components/Page';
import { IPageProps } from './interfaces';
import { useAuth } from '../Auth';

const PageContext = createContext({});
export const usePageContext = () => useContext(PageContext);

export const Page: React.FC<PropsWithChildren<IPageProps>> = ({ children, pageTitle, ...rest }) => {
  const { user, setUser } = useAuth();

  const syncProfile = useCallback(async () => {
    try {
      const sessionData = await validateSession();
      setUser(sessionData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, []);

  useEffect(() => {
    syncProfile();
  }, []);

  return (
    <PageContext.Provider value={{}}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <PageWrapper user={user} {...(rest as any)}>
        {children}
      </PageWrapper>
    </PageContext.Provider>
  );
};
