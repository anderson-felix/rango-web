import { InputProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface IInputProps extends InputProps {
  onInputChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export interface ICodeInputProps {
  onFill?: (value: string) => void;
  onChange?: (value: string) => void;
  codeLength?: number;
  error?: string;
}
