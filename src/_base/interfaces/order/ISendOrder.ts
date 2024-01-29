import { IOrderMetatada } from './IOrderMetatada';

export interface ISendOrder {
  store_id: string;
  address: string;
  items: IOrderMetatada[];
}
