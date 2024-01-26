import { api } from '@/_base/classes/api';
import { IOrder, ISendOrder } from '@/_base/interfaces/order';

export const sendOrder = async (params: ISendOrder): Promise<IOrder> => {
  const { data } = await api.post(`/user/order/create`, params);
  return data;
};
