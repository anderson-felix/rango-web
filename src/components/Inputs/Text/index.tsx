import { Flex, Input, Text } from '@chakra-ui/react';
import { IInputProps } from '../interfaces';

export const TextInput: React.FC<IInputProps> = ({ onInputChange, value = '', placeholder, label, error, rightElement, leftElement, ...rest }) => {
  return (
    <Flex direction="column" color="gray600" w="100%">
      {!!label && (
        <Text color={rest.color || 'gray700'} fontSize="13.5px" fontWeight="500" pb="0.25rem">
          {label}
        </Text>
      )}
      <Flex border="1px" borderColor="gray300" borderRadius="6px" bg={rest.bg}>
        {!!leftElement && (
          <Flex align="center" fontSize="1.2rem" p="0 2px 0 12px">
            {leftElement}
          </Flex>
        )}
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onInputChange && onInputChange(e.target.value)}
          border="none"
          padding="10px 10px 10px 6px"
          borderRadius="8px"
          isInvalid={!!error}
          variant="unstyled"
          fontSize="16px"
          {...rest}
        />
        {!!rightElement && (
          <Flex align="center" fontSize="1.2rem" p="0 6px 0 2px">
            {rightElement}
          </Flex>
        )}
      </Flex>
      {!!error && (
        <Flex align="center" gap="0.25rem" pl="0.15rem" color="error500">
          <Text fontSize="12.5px">{error}</Text>
        </Flex>
      )}
    </Flex>
  );
};
