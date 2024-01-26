import { Box, Flex, Text } from '@chakra-ui/react';
import { ICardOrderProps } from './interfaces';
import { ProfilePic, StoreLogo } from '../Logo';
import moment from 'moment';
import { FaPlus } from 'react-icons/fa6';
import { formatCurrency } from '@/_base/utils';
import { useCustomRouter } from '@/_base/hooks';

export const CardOrder: React.FC<ICardOrderProps> = ({ order }) => {
  const router = useCustomRouter();
  return (
    <Flex direction="column" borderRadius="lg" bg="white" position="relative" boxShadow="md">
      <ProfilePic
        src={order.store.profile_pic}
        minH="6rem"
        maxH="6rem"
        overflow="hidden"
        borderRadius="12px 12px 0 0"
        onClick={() => router.push(`/store/${order.store.id}`)}
      />
      <StoreLogo
        src={order.store.logo}
        position="absolute"
        border="2px"
        borderColor="white"
        left="1rem"
        top="4.25rem"
        onClick={() => router.push(`/store/${order.store.id}`)}
      />
      <Flex direction="column" p="1.35rem 1rem 1rem" color="text" flex="1">
        <Flex justify="space-between">
          <Text cursor="pointer" onClick={() => router.push(`/store/${order.store.id}`)}>
            {order.store.display_name}
          </Text>
          <Box color="primary300" border="1px" borderRadius="md" p="0.15rem" fontSize="1.25rem" cursor="pointer">
            <FaPlus />
          </Box>
        </Flex>
        <Text fontSize="14px" color="gray500">
          {moment(order.created_at).calendar()}
        </Text>
        <Text fontSize="14px" color="gray500" noOfLines={2} pb="1rem">
          {`Em  ${order.address}`}
        </Text>
        {order.items.map((orderItem) => (
          <Flex key={orderItem.name} fontSize="14px" gap="0.25rem">
            <Text fontWeight="500">{orderItem.quantity}x</Text>
            <Text>{formatCurrency(orderItem.unit_price)}</Text>
            <Text color="gray500" pl="0.15rem">
              {orderItem.name}
            </Text>
          </Flex>
        ))}
        <Flex justify="flex-end" fontSize="14px" gap="0.25rem">
          <Text color="gray500">Total:</Text>
          <Text fontWeight="500">{formatCurrency(order.items.reduce((acc, item) => (acc += Number(item.unit_price) * item.quantity), 0))}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
