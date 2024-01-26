import { ReactNode } from 'react';

export interface ITableProps<T = object> {
  columnSizes?: TableColumnSize<T>[];
  columns: TableColumnType<T>[];
  rows: T[];
  onRowClick: (row: T) => void;
}

export type TableColumnType<T> = { label: ReactNode; field: keyof T };
export type TableColumnSize<T> = { width: string; field: keyof T };
