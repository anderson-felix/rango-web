import { api } from '@/_base/classes/api';
import { IOrder } from '@/_base/interfaces/order';

export const listOrders = async (): Promise<IOrder[]> => {
  const { data } = await api.get(`/user/order/list`);
  return data;
};
