import { IStoreMenuItem } from './IStoreMenuItem';

export interface IStore {
  id: string;
  display_name: string;
  address: string;
  profile_pic: string;
  logo: string;
  segments: string[];
  created_at: Date;
  updated_at: Date;
  menu: IStoreMenuItem[];
  rating_average: string;
  users_liked: string[];
}
