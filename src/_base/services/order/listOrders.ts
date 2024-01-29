import { api } from '@/_base/classes/api';
import { IOrder } from '@/_base/interfaces/order';

export const listOrders = async (): Promise<IOrder[]> => {
  const { data } = await api.get(`/user/order/list`);

  data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return data;
};
