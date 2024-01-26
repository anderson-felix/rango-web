import { Flex, Input, Text } from '@chakra-ui/react';

import { IInputProps } from '../interfaces';

export const DateInput: React.FC<IInputProps> = ({ onInputChange, value = '', placeholder, label, error, ...rest }) => (
  <Flex direction="column">
    {!!label && (
      <Text color={rest.color || "gray700"} fontSize="13.5px" fontWeight="500" pb="0.25rem" bg={rest.bg}>
        {label}
      </Text>
    )}
    <Input
      type="date"
      border="1px"
      borderColor="gray300"
      borderRadius="6px"
      padding="10px"
      isInvalid={!!error}
      variant="unstyled"
      fontSize="16px"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onInputChange && onInputChange(e.target.value)}
      {...rest}
    />
    {!!error && (
      <Flex align="center" gap="0.25rem" pl="0.15rem" color="error500">
        <Text fontSize="12.5px">{error}</Text>
      </Flex>
    )}
  </Flex>
);
