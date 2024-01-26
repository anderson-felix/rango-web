import { api } from '@/_base/classes/api';
import { IUser } from '@/_base/interfaces/user';

export const getProfile = async (): Promise<IUser> => {
  const { data } = await api.get(`/user/profile`);
  return data;
};
