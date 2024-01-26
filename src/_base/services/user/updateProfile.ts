import { api } from '@/_base/classes/api';
import { IAddress } from '@/_base/interfaces/shared';
import { IUser } from '@/_base/interfaces/user';
import IRegisterUser from '@/_base/interfaces/user/IRegisterUser';

type Params = Partial<Omit<IRegisterUser, `password`>> & { address: IAddress };

export const updateProfile = async (params: Params): Promise<IUser> => {
  const { data } = await api.patch('/user/me', params);
  return data;
};
