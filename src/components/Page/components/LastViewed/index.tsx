import { AppCarousel } from '@/components/Carousel';
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { StoreLogo } from '@/components/Logo';
import { useRouter } from 'next/router';
import { IStore } from '@/_base/interfaces/store';
import { useEffect, useState } from 'react';
import { listStores } from '@/_base/services/store';
import { cookieManager } from '@/_base/utils';

interface IProps {}

export const LastViewed: React.FC<IProps> = () => {
  const router = useRouter();
  const [stores, setStores] = useState<IStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storageData = cookieManager.getCookie<string[]>(`last_viewed`, true);

      if (!storageData) {
        setIsLoading(false);
        return;
      }

      const _stores = await listStores();
      setStores(storageData.map((id) => _stores.find((store) => store.id === id) as IStore));
      setIsLoading(false);
    })();
  }, []);

  return !isLoading && !stores.length ? null : (
    <Flex
      direction="column"
      p="0.35rem 1rem"
      sx={{ '.carousel': { width: `100%`, zIndex: `2`, position: `relative` } }}
      boxShadow="md"
      borderRadius="0 0 8px 8px"
      bg="surface"
      gap="0.35rem"
      display={{ base: `flex`, md: `none` }}
    >
      <Text fontSize="14px" opacity="0.8" color="text">
        Ver novamente
      </Text>
      {isLoading ? (
        <Skeleton h="4.5rem" rounded={8} />
      ) : (
        <AppCarousel className="carousel" itemsByDevice={{ mobile: 3 }} infinite={false}>
          {stores.map((store) => (
            <Flex
              key={store.id}
              direction="column"
              w="8rem"
              align="center"
              justify="center"
              gap="0.35rem"
              onClick={() => router.push(`/store/${store.id}`)}
            >
              <StoreLogo src={store.logo} boxShadow="xs" />
              <Text noOfLines={2} textAlign="center" flex="1" color="text" fontSize="14px" opacity="0.8">
                {store.display_name}
              </Text>
            </Flex>
          ))}
        </AppCarousel>
      )}
    </Flex>
  );
};
