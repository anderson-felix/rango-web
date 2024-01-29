import { Flex, Text } from '@chakra-ui/react';
import { IStoreListItemProps } from './interfaces';
import { StoreLogo } from '../Logo';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa6';
import { BsDot } from 'react-icons/bs';
import { useAuth, useCustomRouter } from '@/_base/hooks';

export const StoreListItem: React.FC<IStoreListItemProps> = ({ store, onLike, user, segmentsQuantity = 1 }) => {
  const router = useCustomRouter();

  const loggedUser = user || useAuth().user;
  const storeIsLiked = !!store.users_liked.find((id) => id === loggedUser.id);

  return (
    <Flex
      w="100%"
      minH="4.5rem"
      maxH="4.5rem"
      borderRadius="lg"
      bg="surface"
      boxShadow="md"
      border="1px"
      borderColor="gray100"
      position="relative"
      overflow="hidden"
      p="0.75rem"
      gap="0.75rem"
      fontSize="15px"
      align="center"
      cursor="pointer"
      transition="all 0.15s"
      _hover={{ boxShadow: `lg` }}
    >
      <StoreLogo src={store.logo} left="1rem" />
      <Flex direction="column" color="text" gap="0.25rem" onClick={() => router.push(`/store/${store.id}`)}>
        <Text fontWeight="500">{store.display_name}</Text>
        <Flex color="primary400" align="center" gap="0.25rem">
          <FaStar />
          <Text>{Number(store.rating_average).toFixed(1)}</Text>
          <Flex color="text" gap="0.25rem" align="center">
            <BsDot />
            <Text fontSize="14px">
              {store.segments.slice(0, segmentsQuantity).reduce((acc, segment) => {
                if (acc) acc = `${acc} - ${segment}`;
                else acc = segment;

                return acc;
              }, '')}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex flex="1" justify="flex-end" align="center" px="0.5rem">
        <Flex color="primary500" fontSize="1.25rem" cursor="pointer" onClick={() => onLike && onLike(store.id, !storeIsLiked)}>
          {storeIsLiked ? <FaHeart /> : <FaRegHeart />}
        </Flex>
      </Flex>
    </Flex>
  );
};
