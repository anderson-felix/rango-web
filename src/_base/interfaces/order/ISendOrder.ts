import { IOrderMetatada } from './IOrderMetatada';

export interface ISendOrder {
  store_id: string;
  items: IOrderMetatada[];
}
