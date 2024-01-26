import { GetServerSideProps } from 'next';

import { cookieManager } from '@/_base/utils';

const Logout: React.FC = () => null;

export default Logout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  cookieManager.forceTokenExpires(res);
  return { redirect: { destination: `/login`, permanent: false } };
};
