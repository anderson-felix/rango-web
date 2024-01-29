import { api } from '@/_base/classes/api';
import { IStore } from '@/_base/interfaces/store';

export const listStores = async (): Promise<IStore[]> => {
  const { data } = await api.get<IStore[]>(`/store/list`);
  data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return data;
};
