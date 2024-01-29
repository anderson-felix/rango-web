import { IAddress } from '../interfaces/shared';

type CheckAddressFuncType = (address?: IAddress | null) => boolean;

export const checkAddress: CheckAddressFuncType = (address) => Object.values(address || {}).length >= 8;
