import { IStore } from '@/_base/interfaces/store';
import { IUser } from '@/_base/interfaces/user';

export interface IStoreListItemProps {
  store: IStore;
  user?: IUser;
  segmentsQuantity?: number;
  onLike?: (store_id: string, liked: boolean) => void;
}
