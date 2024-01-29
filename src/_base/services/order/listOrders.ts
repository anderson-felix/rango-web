import { api } from '@/_base/classes/api';
import { IOrder } from '@/_base/interfaces/order';

export const listOrders = async (): Promise<IOrder[]> => {
  const { data } = await api.get<IOrder[]>(`/user/order/list`);

  data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return data;
};
