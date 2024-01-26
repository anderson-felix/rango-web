import { UseToastOptions } from '@chakra-ui/react';

export const showErrorToClient = (error: any, toast: (data: UseToastOptions) => void) => {
  const message: string =
    error?.response?.data?.response?.message ||
    error?.response?.data?.validation?.body?.message ||
    error?.response?.data?.message ||
    error?.response?.message ||
    error?.message ||
    'Ocorreu um erro';

  toast({
    status: 'error',
    title: String(message) || 'Error Occurred',
  });
};
