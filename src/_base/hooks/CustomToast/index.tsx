import { UseToastOptions, useToast } from '@chakra-ui/react';

const toastConfig = {
  duration: 5000,
  isClosable: true,
};

export const useCustomToast = (options: UseToastOptions = {}) => useToast({ ...toastConfig, ...options });
