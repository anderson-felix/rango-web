import { Flex, Link, Text } from '@chakra-ui/react';
import { GiCheckMark } from 'react-icons/gi';

interface IProps { }

export const FinishStep: React.FC<IProps> = () => {
  return (
    <Flex direction="column" justify="space-between" h="100%">
      <Flex width="100%" marginTop="32px" gap="20px">
        <GiCheckMark fontSize="40px" style={{ backgroundColor: '#E0EEFF', color: '#6699FF', borderRadius: '50%', padding: '8px' }} />
      </Flex>
      <Flex padding="20px 0" width="100%" color="white" align="center" gap="8px">
        <Flex direction="column" gap="8px">
          <Text fontWeight="600" fontSize="20px" color="white">
            Cadastro realizado com sucesso
          </Text>
          <Text color="white">Parabéns! Seu cadastro foi realizado com sucesso. Agora você pode fazer o login para acessar sua conta</Text>
        </Flex>
      </Flex>
      <Link href="/login" width="100%">
        <Flex color="white" align="center" justify="center" borderRadius="8px" padding="10px 18px" bg="primary300">
          <Text fontWeight="600">Voltar</Text>
        </Flex>
      </Link>
    </Flex>
  );
};
