import { GetServerSideProps } from 'next';

import { logError, cookieManager } from '@/_base/utils';
import { Flex, Text } from '@chakra-ui/react';
import { IUser } from '@/_base/interfaces/user';
import { CardStore } from '@/components/CardStore';
import { IStore } from '@/_base/interfaces/store';
import { AppCarousel } from '@/components/Carousel';
import { StoreListItem } from '@/components/StoreListItem';

interface IProps {
  user: IUser;
  stores: IStore[]
}

const Home: React.FC<IProps> = ({ stores }) => {
  return (
    <Flex direction="column" w="100%" flex="1" gap="1rem" color="text" p="1rem 1rem 0" overflow="hidden auto">
      <Text>Recomendado para você</Text>
      <Flex direction="column" minH="12rem">
        <AppCarousel showDots={true} removeArrowOnDeviceType={['tablet', 'mobile']}>
          {stores.map((store) => (
            <CardStore key={store.id} store={store} />
          ))}
        </AppCarousel>
      </Flex>
      <Flex direction="column" gap="1.25rem" pb="1remd">
        {stores.map((store) => (
          <StoreListItem key={store.id} store={store} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const selectedPage = 'home';

  try {
    cookieManager.updateToken(req);

    // const user = await validateSession();

    return { props: { selectedPage, pageTitle: 'Rango', stores: [], showBackButton: false, showUserInfo: true } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
