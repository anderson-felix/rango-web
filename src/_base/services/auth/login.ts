import { api } from '@/_base/classes/api';
import { IAuthRequest, IAuthResponse } from '@/_base/interfaces/auth';

export const login = async (credentials: IAuthRequest): Promise<IAuthResponse> => {
  const { data } = await api.post('/user/session', credentials);
  return data;
};
