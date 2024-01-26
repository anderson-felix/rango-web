import { useState } from 'react';

import { IInputHandlerOutput, IInputHandlerProps, InputHandlerErrorType } from './interfaces';
import { zodErrorHandler } from '@/_base/errors/zodErrorHandler';

export function useInputHandler<T>(props?: IInputHandlerProps<T>): IInputHandlerOutput<T> {
  const [errors, setErrors] = useState<InputHandlerErrorType<T>>({} as any);
  const [data, setData] = useState<T>({} as T);

  const onInputChange = (field: keyof T, value: any) => {
    setErrors((e) => ({ ...e, [field]: undefined }));
    setData((e) => ({ ...e, [field]: value }));
  };

  const checkErrors = () => {
    if (!props?.schema) return;
    const invalidData = zodErrorHandler(props.schema, data);
    setErrors(invalidData as any);
  };

  const submit = (cb: () => any) => {
    if (!props?.schema) return cb();
    const invalidData = zodErrorHandler(props.schema, data);
    if (!invalidData) return cb();
    setErrors(invalidData as any);
  };

  return { errors, setErrors, data, setData, onInputChange, submit, checkErrors };
}
