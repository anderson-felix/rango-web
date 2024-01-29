import { GetServerSideProps } from 'next';

import { logError, cookieManager } from '@/_base/utils';
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { IUser } from '@/_base/interfaces/user';
import { CardStore } from '@/components/CardStore';
import { IStore } from '@/_base/interfaces/store';
import { AppCarousel } from '@/components/Carousel';
import { StoreListItem } from '@/components/StoreListItem';
import { validateSession } from '@/_base/services/auth';
import { useCallback, useEffect, useState } from 'react';
import { listStores, rateStore } from '@/_base/services/store';

interface IProps {
  user: IUser;
}

const Home: React.FC<IProps> = ({ user }) => {
  const [stores, setStores] = useState<IStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const _stores = await listStores();
      setStores(_stores);
      setIsLoading(false);
    })();
  }, []);

  const handleLikeStore = useCallback(async (store_id: string, liked?: boolean) => {
    const updatedStore = await rateStore({ store_id, liked });

    setStores((s) => s.map((store) => (store.id === updatedStore.id ? updatedStore : store)));
  }, []);

  return (
    <Flex
      direction="column"
      w="100%"
      maxW={{ base: undefined, md: `70rem` }}
      margin={{ base: undefined, md: '0 auto' }}
      flex="1"
      gap="1rem"
      color="text"
      p="1rem 1rem 0"
      overflow="hidden auto"
    >
      <Text>Recomendado para você</Text>
      <Flex direction="column" minH="12rem">
        {isLoading ? (
          <Skeleton h="12rem" rounded={8} />
        ) : (
          <AppCarousel showDots={true} removeArrowOnDeviceType={['tablet', 'mobile']} itemsByDevice={{ desktop: 5 }}>
            {stores.map((store) => (
              <CardStore key={store.id} store={store} />
            ))}
          </AppCarousel>
        )}
      </Flex>
      <Flex direction="column" gap="1.25rem">
        <Text>Novidades</Text>

        {stores.map((store) => (
          <StoreListItem key={store.id} store={store} onLike={handleLikeStore} user={user} />
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

    const user = await validateSession();

    return { props: { selectedPage, pageTitle: 'Rango', stores: [], showBackButton: false, showUserInfo: true, user } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
