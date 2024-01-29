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
      minW="9.5rem"
      minH="10.5rem"
      maxW="9.5rem"
      maxH="10.5rem"
      borderRadius="lg"
      bg="surface"
      position="relative"
      overflow="hidden"
      boxShadow="md"
      onClick={() => router.push(`/store/${store.id}`)}
      cursor="pointer"
      transition="all 0.15s"
      _hover={{ boxShadow: `lg` }}
    >
      <Flex h="6rem" bgImage={store.profile_pic} bgPosition="center" bgSize="contain" w="100%" />
      <StoreLogo src={store.logo} position="absolute" border="2px" borderColor="gray400" left="1rem" top="50%" transform="translate(0, -50%)" />
      <Flex h="6rem" p="2rem 1rem 0" color="text" fontSize="14px">
        {store.display_name}
      </Flex>
    </Flex>
  );
};
