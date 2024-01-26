import { ZodCustomSchema } from '@/_base/interfaces/zod';
import { Dispatch, SetStateAction } from 'react';

export type InputHandlerErrorType<T> = Record<keyof T, string | undefined>;

export interface IInputHandlerProps<T> {
  schema?: ZodCustomSchema<T>;
  data?: T;
}

export interface IInputHandlerOutput<T> {
  setErrors: Dispatch<SetStateAction<InputHandlerErrorType<T>>>;
  errors: InputHandlerErrorType<T>;
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  onInputChange: (field: keyof T, value: any) => void;
  submit: (cb: (args?: any) => any) => void;
  checkErrors: () => void;
}
