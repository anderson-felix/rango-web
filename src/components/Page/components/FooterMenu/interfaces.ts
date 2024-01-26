import { IUser } from '@/_base/interfaces/user';
import { IconType } from 'react-icons';

export type MenuItemType = { name: string; page: string; icon: IconType; ref?: any; tourDescription?: string };

export interface INavbarProps {
  page: string;
  user?: IUser;
}
