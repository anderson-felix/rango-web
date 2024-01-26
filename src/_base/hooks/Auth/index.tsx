import { EMPTY_USER, IUser } from '@/_base/interfaces/user';
import { create } from 'zustand';

type UseAuthHookType = { user: IUser; setUser: (user: IUser) => void };

export const useAuth = create<UseAuthHookType>((set) => ({
  user: EMPTY_USER,
  setUser: (data: IUser) => set(() => ({ user: data })),
}));
