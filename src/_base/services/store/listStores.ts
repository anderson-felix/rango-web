import { api } from '@/_base/classes/api';
import { IStore } from '@/_base/interfaces/store';

export const listStores = async (): Promise<IStore[]> => {
  const { data } = await api.get(`/store/list`);
  data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return data;
};
