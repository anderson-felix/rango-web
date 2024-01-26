import { GetServerSideProps } from 'next';

import { logError, cookieManager } from '@/_base/utils';
import { Flex, Img, Text } from '@chakra-ui/react';
import { IUser } from '@/_base/interfaces/user';
import { CardOrder } from '@/components/CardOrder';
import { GenericButton } from '@/components/Buttons/Generic';
import { useCustomRouter } from '@/_base/hooks';
import { IOrder } from '@/_base/interfaces/order';

interface IProps {
  user: IUser;
  orders: IOrder[]
}

const Orders: React.FC<IProps> = ({ orders }) => {
  const router = useCustomRouter();
  return (
    <Flex direction="column" w="100%" flex="1" gap="1rem" color="text" p="1rem" overflow="hidden auto">
      {orders.length ? (
        orders.map((order) => <CardOrder key={order.id} order={order} />)
      ) : (
        <Flex direction="column" align="center" gap="1rem" mt="2rem">
          <Text fontSize="18px" color="text">
            Você ainda não fez nenhum pedido
          </Text>{' '}
          <Img src="/icons/empty-bowl.svg" h="4rem" />
          <GenericButton
            label="Ver Loja"
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
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const selectedPage = 'orders';

  try {
    cookieManager.updateToken(req);

    // const user = await validateSession();

    return { props: { selectedPage, pageTitle: 'Rango - pedidos', orders: [], showBackButton: false } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
