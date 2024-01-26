import { IOrder } from '../order';
import { IAddress } from '../shared';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: IAddress;
  birthdate: Date;
  orders: IOrder[];
}

export const EMPTY_USER: IUser = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: {
    address: ``,
    number: ``,
    complement: ``,
    neighborhood: ``,
    city: ``,
    state: ``,
    country: ``,
    zip_code: ``,
  },
  birthdate: new Date(),
  orders: [],
};
