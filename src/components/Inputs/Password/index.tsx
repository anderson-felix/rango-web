import {
  Flex,
  Input,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Popover,
  useUpdateEffect,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { Progress } from 'rsuite';
import { FaRegCircleQuestion } from 'react-icons/fa6';

import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { IInputProps } from '../interfaces';
import { validatePassword } from '@/_base/utils';

interface IPasswordProps {
  passStrong?: 2 | 3 | 4;
  onPassStrongReached?: () => void;
  onPassStrongUnreached?: () => void;
  minPassLength?: number;
}

export const PasswordInput: React.FC<IInputProps & IPasswordProps> = ({
  value = '',
  placeholder,
  label,
  error,
  onInputChange,
  passStrong,
  onPassStrongReached,
  onPassStrongUnreached,
  minPassLength = 8,
  ...rest
}) => {
  const [showPass, setShowPass] = useState(false);
  const passwordStrong = useMemo<number>(() => {
    let score: number = zxcvbn(value).score;

    const isValid = validatePassword(value);

    if (!isValid && score > 2) score = (passStrong || 2) - 1;

    return score;
  }, [value]);

  useUpdateEffect(() => {
    if (onPassStrongReached && passStrong && value.length >= minPassLength && passwordStrong >= passStrong) onPassStrongReached();
    else onPassStrongUnreached && onPassStrongUnreached();
  }, [passwordStrong]);

  return (
    <Flex direction="column" color="text.light">
      {!!label && (
        <Text color="gray700" fontSize="13.5px" pb="0.25rem" fontWeight="500" {...rest}>
          {label}
        </Text>
      )}
      <Flex border="1px" borderColor="gray300" borderRadius="6px">
        <Input
          type={showPass ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onInputChange && onInputChange(e.target.value)}
          border="none"
          padding="10px 14px 10px 14px"
          borderRadius="8px"
          isInvalid={!!error}
          variant="unstyled"
          fontSize="16px"
          {...rest}
        />
        <Flex color="gray300" align="center" fontSize="1.2rem" p="0 6px 0 2px" cursor="pointer" onClick={() => setShowPass((e) => !e)}>
          {showPass ? <BsEyeSlash /> : <BsEye />}
        </Flex>
      </Flex>
      {!!passStrong && (
        <Flex w="100%" align="center" px="0.15rem" pt="0.15rem">
          <Progress.Line percent={passwordStrong * 25} status={passwordStrong < passStrong ? 'fail' : 'success'} style={{ padding: '0' }} />
          <Popover placement="right">
            <PopoverTrigger>
              <Flex ml="-1rem" color="gray300" cursor="pointer">
                <FaRegCircleQuestion />
              </Flex>
            </PopoverTrigger>
            <PopoverContent border="none" bg="indigo25" color="gray400" fontSize={'14px'}>
              <PopoverArrow bg="indigo25" />
              <PopoverCloseButton />
              <PopoverHeader>Use uma senha forte!</PopoverHeader>
              <PopoverBody>
                <UnorderedList>
                  <ListItem>Pelo menos {minPassLength} caracteres.</ListItem>
                  <ListItem>Letras maiúsculas e minúsculas.</ListItem>
                  <ListItem>Números.</ListItem>
                  <ListItem>Caracteres especiais, como !, @, #, $, etc.</ListItem>
                </UnorderedList>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      )}
      {!!error && (
        <Flex align="center" gap="0.25rem" pl="0.15rem" color="error500">
          <Text fontSize="12.5px">{error}</Text>
        </Flex>
      )}
    </Flex>
  );
};
