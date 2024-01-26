import { Flex, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaGear } from 'react-icons/fa6';
import { FiLogOut, FiMenu } from 'react-icons/fi';

export const HeaderMenu: React.FC = () => {
  const router = useRouter();
  return (
    <Menu>
      <MenuButton as={IconButton} aria-label="Options" icon={<FiMenu />} bg="transparent !important" color="primary300" />
      <MenuList color="text" borderColor="gray300" fontSize="18px">
        <MenuItem>
          <Flex
            cursor="pointer"
            transition="0.12s"
            _hover={{ filter: 'brightness(0.7)' }}
            onClick={() => router.push('/profile')}
            align="center"
            gap="1rem"
            color="primary300"
          >
            <FaGear />
            <Text color="text" fontSize="15px">
              Configurações
            </Text>
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <Flex
            cursor="pointer"
            transition="0.12s"
            _hover={{ filter: 'brightness(0.7)' }}
            onClick={() => router.push('/logout')}
            align="center"
            gap="1rem"
          >
            <FiLogOut color="#FDA29B" />
            <Text color="text" fontSize="15px">
              Sair
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
