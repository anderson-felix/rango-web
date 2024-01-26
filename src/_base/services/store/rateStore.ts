import { api } from '@/_base/classes/api';
import { IStore } from '@/_base/interfaces/store';

export const rateStore = async (store_id: string, rating: number): Promise<IStore> => {
  const { data } = await api.post(`/user/store/rating`, { store_id, rating });
  return data;
};
