import { FiBell } from 'react-icons/fi';
import { Flex, Text, Tooltip } from '@chakra-ui/react';

import { IUser } from '@/_base/interfaces/user';
import { AppLogo } from '@/components/Logo';
import { dimensions } from '@/styles/global';

interface IProps {
  user?: IUser;
  headerLabel?: string;
}

export const Header: React.FC<IProps> = ({ headerLabel }) => {
  return (
    <Flex
      maxH={dimensions.header.height}
      minH={dimensions.header.height}
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      padding="0 0.5rem"
      borderRadius="0 0 0.4rem 0.4rem"
      borderColor="primary"
      bg="externalContentBG"
      userSelect="none"
      boxShadow="md"
      position="relative"
    >
      <AppLogo size="xs" theme="dark" type="text" />
      {!!headerLabel && (
        <Flex position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Tooltip label={`Projeto: ${headerLabel}`}>
            <Text fontSize="19px" fontWeight="500">
              {headerLabel}
            </Text>
          </Tooltip>
        </Flex>
      )}
      <Flex gap="1rem" align="center" fontSize="1.75rem">
        <Tooltip label="Notificações">
          <Flex cursor="pointer" transition="0.12s" _hover={{ filter: 'brightness(0.7)' }}>
            <FiBell color="#667085" />
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
