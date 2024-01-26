import { api } from '@/_base/classes/api';
import { IStore } from '@/_base/interfaces/store';

export const listOrders = async (): Promise<IStore[]> => {
  const { data } = await api.get(`/user/order/list`);
  return data;
};
