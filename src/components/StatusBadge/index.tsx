import { Flex, Text } from '@chakra-ui/react';
import { Badge } from 'antd';

import { OrderStatusType } from '@/_base/interfaces/order';
import { IStatusBadgeProps } from './interfaces';

export const StatusBadge: React.FC<IStatusBadgeProps> = ({ status }) => {
  const BadgeMapper: Record<OrderStatusType, React.ReactElement> = {
    pending: (
      <Flex gap="0.25rem" align="center">
        <Badge status="warning" />
        <Text color="gray500">Aguardando aprovação</Text>
      </Flex>
    ),
    preparing: (
      <Flex gap="0.25rem" align="center">
        <Badge status="processing" />
        <Text color="gray500">Em preperação</Text>
      </Flex>
    ),
    in_delivery: (
      <Flex gap="0.25rem" align="center">
        <Badge status="processing" />
        <Text color="gray500">Em rota de entrega</Text>
      </Flex>
    ),
    finished: (
      <Flex gap="0.25rem" align="center">
        <Badge status="success" />
        <Text color="gray500">Pedido entregue</Text>
      </Flex>
    ),
  };

  return BadgeMapper[status];
};
