import { api } from '@/_base/classes/api';
import { IAuthResponse } from '@/_base/interfaces/auth';

export const googleLogin = async (identifier: string): Promise<IAuthResponse> => {
  const { data } = await api.post('/user/session/google', { identifier });
  return data;
};
