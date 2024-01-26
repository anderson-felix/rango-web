import { ReactNode } from 'react';

export interface IGenericButton {
  label: string | ReactNode;
  btntype?: 'primary' | 'outline' | 'outline-white' | 'warning' | 'outline-warning';
}
