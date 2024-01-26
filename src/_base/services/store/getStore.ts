import { api } from '@/_base/classes/api';
import { IStore } from '@/_base/interfaces/store';

export const getStore = async (store_id: string): Promise<IStore> => {
  const { data } = await api.get(`/store/show/${store_id}`);
  return data;
};
