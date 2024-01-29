import { IOrder, IStorageOrderMetatada } from '@/_base/interfaces/order';

export interface ICardOrderProps {
  order: IOrder;
  onUpdateCart: (data: IStorageOrderMetatada) => void;
}
