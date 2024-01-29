import { IAddress } from '../interfaces/shared';

type FormatAddressFuncType = (address: IAddress, showNeighborhood?: boolean) => string;

export const formatAddress: FormatAddressFuncType = ({ address, number, neighborhood }, showNeighborhood = false) =>
  `${address}, ${number} ${showNeighborhood ? ' - '.concat(neighborhood || ``) : ''}`;
