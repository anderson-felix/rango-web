import { GetServerSideProps } from 'next';

import { logError, cookieManager, formatCurrency, formatAddress, checkAddress } from '@/_base/utils';
import { Box, Flex, Img, Text } from '@chakra-ui/react';
import { IUser } from '@/_base/interfaces/user';
import { CardOrder } from '@/components/CardOrder';
import { GenericButton } from '@/components/Buttons/Generic';
import { useAsyncCallback, useAuth, useCustomRouter, useCustomToast } from '@/_base/hooks';
import { IOrder, IStorageOrderItemMetatada, IStorageOrderMetatada } from '@/_base/interfaces/order';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa6';
import { listOrders, sendOrder } from '@/_base/services/order';
import { IoCartOutline } from 'react-icons/io5';

interface IProps {
  user: IUser;
  orders: IOrder[];
}

const Orders: React.FC<IProps> = ({ orders: _orders }) => {
  const [cart, setCart] = useState<IStorageOrderMetatada | null>(null);
  const [orders, setOrders] = useState<IOrder[]>(_orders);

  const { user } = useAuth();
  const router = useCustomRouter();
  const toast = useCustomToast();

  useEffect(() => {
    const storageData = cookieManager.getCookie<IStorageOrderMetatada>(`cart`, true);

    setCart(storageData);
  }, []);

  const updateCartItem = (cartItem: IStorageOrderItemMetatada) => {
    if (!cartItem.quantity)
      setCart((state) => {
        if (!state) return null;

        const updatedData: IStorageOrderMetatada = { store_id: state.store_id, items: state.items.filter((item) => item.id !== cartItem.id) };

        cookieManager.setCookie(`cart`, JSON.stringify(updatedData));
        return updatedData;
      });
    else
      setCart((state) => {
        if (!state) return null;

        const updatedData: IStorageOrderMetatada = {
          store_id: state.store_id,
          items: state.items.map((item) => (item.id === cartItem.id ? cartItem : item)),
        };

        cookieManager.setCookie(`cart`, JSON.stringify(updatedData));
        return updatedData;
      });
  };

  const handleCreateOrder = useAsyncCallback(async () => {
    if (!cart) return;
    if (!checkAddress(user.address)) {
      toast({ status: `error`, description: `Você ainda não cadastrou seu endereço`, position: `top` });
      return;
    }
    toast({ status: `loading`, description: `Enviando seu pedido`, position: `top`, duration: 3000 });

    const order = await sendOrder({
      store_id: cart.store_id,
      address: formatAddress(user.address),
      items: cart.items.map((item) => ({ name: item.name, quantity: item.quantity, unit_price: item.unit_price })),
    });
    order.status ||= `pending`;

    setTimeout(() => {
      toast({ status: `success`, description: `Pedido enviado para a loja!`, position: `top` });
      setOrders((state) => [order, ...state]);
      setCart(null);
      cookieManager.removeCookie(`cart`);
    }, 2300);
  }, [cart]);

  const handleClearCart = () => {
    cookieManager.removeCookie(`cart`);
    setCart(null);
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row-reverse' }}
      w="100%"
      maxW={{ base: undefined, md: `70rem` }}
      margin={{ base: undefined, md: '0 auto' }}
      flex="1"
      gap={{ base: '1rem', md: `2rem` }}
      color="text"
      p="1rem"
      overflow="hidden auto"
      transition="all 0.2s"
    >
      <Flex direction="column" flex="1">
        <Text mb="0.5rem" fontWeight="500" opacity="0.7">
          Meu carrinho
        </Text>
        {cart?.items.length ? (
          <Flex border="1px" borderColor="gray300" borderRadius="md" direction="column" p="0.5rem 1rem " mt="1rem" bg="surface">
            {cart.items.map((cartItem, i) => (
              <Flex key={cartItem.id} borderBottom={i + 1 < cart.items.length ? `1px` : undefined} borderColor="gray200" py="0.5rem">
                <Flex direction="column" flex="1">
                  <Text noOfLines={2}>{cartItem.name}</Text>
                  <Flex gap="0.25rem">
                    <Text>Valor:</Text>
                    <Text fontWeight="500">{formatCurrency(Number(cartItem.unit_price) * cartItem.quantity)}</Text>
                  </Flex>
                </Flex>

                <Flex color="primary300" mt="0.25rem" align="flex-end" justify="center" gap="0.5rem">
                  <Box
                    border="1px"
                    borderRadius="md"
                    p="0.25rem"
                    fontSize="1rem"
                    cursor="pointer"
                    h="fit-content"
                    onClick={() => updateCartItem({ ...cartItem, quantity: cartItem.quantity - 1 })}
                  >
                    <FaMinus />
                  </Box>
                  <Text>{cartItem.quantity}</Text>
                  <Box
                    border="1px"
                    borderRadius="md"
                    p="0.25rem"
                    fontSize="1rem"
                    cursor="pointer"
                    h="fit-content"
                    onClick={() => updateCartItem({ ...cartItem, quantity: cartItem.quantity + 1 })}
                  >
                    <FaPlus />
                  </Box>
                </Flex>
              </Flex>
            ))}
            <Flex justify="flex-end" m="1rem 0 0.5rem" gap="0.5rem">
              <Text>Total:</Text>
              <Text>{formatCurrency(cart.items.reduce((acc, item) => (acc += Number(item.unit_price)), 0))}</Text>
            </Flex>
            <Flex justify="space-between" m="1rem 0 0.5rem">
              <GenericButton label={<FaTrash />} p="0" fontSize="1rem" size="sm" btntype="outline-warning" onClick={handleClearCart} />
              <GenericButton
                label="Enviar pedido"
                size="sm"
                btntype="outline"
                borderColor="gray200"
                color="text"
                _hover={{ color: `primary300` }}
                onClick={handleCreateOrder}
              />
            </Flex>
          </Flex>
        ) : (
          <Flex color="primary300" direction="column" gap="0.25rem" align="center">
            <IoCartOutline fontSize="2rem" />
            <Text color="gray500">Vazio</Text>
          </Flex>
        )}
      </Flex>
      <Flex direction="column" flex="1" gap={{ base: '1rem', md: `2rem` }}>
        <Text m={{ base: '1rem 0 0.5rem', md: '0' }} fontWeight="500" opacity="0.7">
          Meus pedidos
        </Text>
        {orders.map((order) => (
          <CardOrder key={order.id} order={order} onUpdateCart={setCart} />
        ))}
        {!orders.length && !cart?.items?.length && (
          <Flex direction="column" align="center" gap="1rem" mt="2rem">
            <Text fontSize="18px" color="text">
              Você ainda não fez nenhum pedido
            </Text>{' '}
            <Img src="/icons/empty-bowl.svg" h="4rem" />
            <GenericButton
              label="Ver lojas"
              btntype="primary"
              bg="tranparent"
              color="primary300"
              border="1px"
              mt="4rem"
              onClick={() => router.push(`/home`)}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const selectedPage = 'orders';

  try {
    cookieManager.updateToken(req);

    const orders = await listOrders();
    return { props: { selectedPage, pageTitle: 'Rango - pedidos', orders, showBackButton: false, showUserInfo: true } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
