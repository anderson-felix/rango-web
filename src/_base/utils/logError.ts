/* eslint-disable no-console */
import { AxiosError } from 'axios';

const logAxiosError = (context: string, error: AxiosError): void => {
  console.error(`${context.toLocaleUpperCase()}: ${(error?.response?.data as any)?.response?.message}`);
};

const logUnexpectedError = (context: string, error: Error): void => {
  console.error(`${context.toLocaleUpperCase()}: ${error.message}`);
};

export const logError = (context: string, error: Error | AxiosError): void => {
  if ((error as any).response) logAxiosError(context, error as AxiosError);
  else logUnexpectedError(context, error);
};
