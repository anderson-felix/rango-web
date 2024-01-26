import { IStore } from './IStore';

export interface IStoreMenuItem {
  id: string;
  name: string;
  store_id: string;
  description: string;
  price: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  store: IStore;
}
