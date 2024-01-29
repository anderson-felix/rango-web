import { api } from '@/_base/classes/api';
import { IStore } from '@/_base/interfaces/store';

interface IRateStoreParams {
  store_id: string;
  rating?: number;
  liked?: boolean;
}

export const rateStore = async (params: IRateStoreParams): Promise<IStore> => {
  const { data } = await api.post(`/user/store/rating`, params);
  return data;
};
