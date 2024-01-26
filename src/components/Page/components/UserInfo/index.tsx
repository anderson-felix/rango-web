import { Flex, Text } from '@chakra-ui/react';
import { MdEditNote } from 'react-icons/md';
import { useRouter } from 'next/router';

interface IProps {}

export const UserInfo: React.FC<IProps> = () => {
  const router = useRouter();

  return (
    <Flex p="0.5rem 1rem" boxShadow="md" borderRadius="0 0 8px 8px" bg="white" justify="space-between" align="center" fontSize="15px" gap="0.5rem">
      <Flex gap="0.25rem">
        Olá,{' '}
        <Text fontWeight="500" color="primary300">
          Anderson
        </Text>
      </Flex>
      <Flex align="center" gap="0.25rem" cursor="pointer" opacity="0.8" onClick={() => router.push('/profile')}>
        <Text fontWeight="500" fontSize="14px">
          Adicionar endereço
        </Text>
        <MdEditNote fontSize="1.125rem" />
      </Flex>
    </Flex>
  );
};
