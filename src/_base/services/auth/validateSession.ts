import { api } from '@/_base/classes/api';
import { IUser } from '@/_base/interfaces/user';

export const validateSession = async (): Promise<IUser> => {
  const { data } = await api.get('/user/validate');
  return data;
};
