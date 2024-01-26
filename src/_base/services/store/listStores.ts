import { api } from '@/_base/classes/api';
import { IStore } from '@/_base/interfaces/store';

export const listStores = async (): Promise<IStore[]> => {
  const { data } = await api.get(`/store/list`);
  return data;
};
