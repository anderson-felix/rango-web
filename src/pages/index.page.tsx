import { validateSession } from '@/_base/services/auth';
import { logError, cookieManager } from '@/_base/utils';
import { GetServerSideProps } from 'next';

export default function Home() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    cookieManager.updateToken(req);

    await validateSession();

    return {
      redirect: { destination: '/profile', permanent: false },
    };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError('root', err);

    return {
      redirect: { destination: '/login', permanent: false },
    };
  }
};
