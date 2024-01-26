import { IStore } from '../store';
import { IUser } from '../user';
import { IOrderMetatada } from './IOrderMetatada';

export interface IOrder {
  id: string;
  readable_id: number;
  store_id: string;
  user_id: string;
  status: string;
  metadata: IOrderMetatada[];
  created_at: Date;
  updated_at: Date;
  store: IStore;
  user: IUser;
}
