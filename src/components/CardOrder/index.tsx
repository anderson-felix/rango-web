import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa6';
import moment from 'moment';

import { ICardOrderProps } from './interfaces';
import { ProfilePic, StoreLogo } from '../Logo';
import { cookieManager, formatCurrency } from '@/_base/utils';
import { useCustomRouter, useCustomToast } from '@/_base/hooks';
import { StatusBadge } from '../StatusBadge';
import { IStorageOrderMetatada } from '@/_base/interfaces/order';
import { SmallModal } from '../Modal/Small';

export const CardOrder: React.FC<ICardOrderProps> = ({ order, onUpdateCart }) => {
  const [openClearModal, setOpenClearModal] = useState(false);

  const router = useCustomRouter();
  const toast = useCustomToast();

  const addOrderInCart = () => {
    const storageData = cookieManager.getCookie<IStorageOrderMetatada>(`cart`, true);

    if (!storageData) {
      const newStorageData: IStorageOrderMetatada = {
        store_id: order.store_id,
        items: order.metadata.map((item, i) => ({ id: i + item.name, ...item })),
      };

      cookieManager.setCookie(`cart`, JSON.stringify(newStorageData));
      onUpdateCart(newStorageData);
    } else if (storageData.store_id !== order.store_id) {
      setOpenClearModal(true);
      return;
    } else {
      storageData.items.push(...order.metadata.map((item, i) => ({ id: `${i + 1}${Date.now()}`, ...item })));

      cookieManager.setCookie(`cart`, JSON.stringify(storageData));
      onUpdateCart(storageData);
    }

    toast({ status: `success`, description: `Item adicionado ao carrinho`, position: `top` });
  };

  const handleClearCart = () => {
    cookieManager.removeCookie(`cart`);
    setOpenClearModal(false);
    addOrderInCart();
  };
  return (
    <Flex
      direction="column"
      borderRadius="lg"
      bg="surface"
      color="text"
      position="relative"
      boxShadow="md"
      transition="all 0.15s"
      _hover={{ boxShadow: `lg` }}
    >
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
          <Box color="primary300" border="1px" borderRadius="md" p="0.15rem" fontSize="1.25rem" cursor="pointer" onClick={addOrderInCart}>
            <FaPlus />
          </Box>
        </Flex>
        <Text fontSize="14px" color="gray500">
          {moment(order.created_at).calendar()}
        </Text>
        <Text fontSize="14px" color="gray500" noOfLines={2} pb="1rem">
          {`Em  ${order.address}`}
        </Text>
        <Flex direction="column" flex="1" justify="flex-end">
          {order.metadata.map((orderItem) => (
            <Flex key={orderItem.name} fontSize="14px" gap="0.25rem">
              <Text fontWeight="500">{orderItem.quantity}x</Text>
              <Text>{formatCurrency(orderItem.unit_price)}</Text>
              <Text color="gray500" pl="0.15rem">
                {orderItem.name}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Flex justify="space-between" fontSize="14px" mt="0.5rem">
          <StatusBadge status={order.status} />
          <Flex gap="0.25rem" align="center">
            <Text color="gray500">Total:</Text>
            <Text fontWeight="500">{formatCurrency(order.metadata.reduce((acc, item) => (acc += Number(item.unit_price) * item.quantity), 0))}</Text>
          </Flex>
        </Flex>
      </Flex>

      <SmallModal title="Atenção" show={!!openClearModal} isCentered onConfirm={handleClearCart} onCancel={() => setOpenClearModal(false)} size="sm">
        <Flex mt="0.5rem" minW="15rem" direction="column" align="center" gap="1rem" my="1.5rem">
          <Text textAlign="center" fontWeight="500" fontSize="18px">
            Seu carrinho contém itens de outra loja, deseja limpar o carrinho para adicionar este item?
          </Text>
        </Flex>
      </SmallModal>
    </Flex>
  );
};
