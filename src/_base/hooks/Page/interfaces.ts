import { IUser } from '@/_base/interfaces/user';

export interface IPageProps {
  user?: IUser;
  selectedPage?: string;
  bgImgType?: `login` | `signup`;
  pageTitle?: string;
  headerLabel?: string;
  showBackButton?: boolean;
  showLastViewed?: boolean;
  showUserInfo?: boolean;
}
