export interface IOrderMetatada {
  name: string;
  unit_price: string;
  quantity: number;
}
export interface IStorageOrderItemMetatada extends IOrderMetatada {
  id: string;
}
export interface IStorageOrderMetatada {
  store_id: string;
  items: IStorageOrderItemMetatada[];
}
