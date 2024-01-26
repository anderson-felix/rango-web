import { Flex } from '@chakra-ui/react';
import { ICardStoreProps } from './interfaces';
import { StoreLogo } from '../Logo';
import { useCustomRouter } from '@/_base/hooks';

export const CardStore: React.FC<ICardStoreProps> = ({ store }) => {
  const router = useCustomRouter();

  return (
    <Flex
      mb="1rem"
      direction="column"
      minW="10rem"
      minH="11rem"
      maxW="10rem"
      maxH="11rem"
      borderRadius="lg"
      bg="white"
      position="relative"
      overflow="hidden"
      boxShadow="md"
      onClick={() => router.push(`/store/${store.id}`)}
    >
      <Flex h="6rem" bgImage={store.profile_pic} bgPosition="center" bgSize="contain" w="100%" />
      <StoreLogo src={store.logo} position="absolute" border="2px" borderColor="gray400" left="1rem" top="50%" transform="translate(0, -50%)" />
      <Flex h="6rem" p="2rem 1rem 0" color="text">
        {store.display_name}
      </Flex>
    </Flex>
  );
};
