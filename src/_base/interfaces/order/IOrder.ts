import { IStore } from '../store';
import { IUser } from '../user';
import { IOrderMetatada } from './IOrderMetatada';
import { OrderStatusType } from './OrderStatusType';

export interface IOrder {
  id: string;
  readable_id: number;
  store_id: string;
  user_id: string;
  address: string;
  status: OrderStatusType;
  metadata: IOrderMetatada[];
  created_at: Date;
  updated_at: Date;
  store: IStore;
  user: IUser;
}
