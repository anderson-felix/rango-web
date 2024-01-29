import { useRef } from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { FaStore, FaUser } from 'react-icons/fa6';
import { FiShoppingBag } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';

import { INavbarProps, MenuItemType } from './interfaces';
import { useRouter } from 'next/router';

export const FooterMenu: React.FC<INavbarProps> = ({ page }) => {
  const menuItems: Array<MenuItemType> = [
    { name: 'Home', page: 'home', icon: FaStore, ref: useRef() },
    { name: 'Buscar', page: 'search', icon: FaSearch, ref: useRef() },
    { name: 'Pedidos', page: 'orders', icon: FiShoppingBag, ref: useRef() },
    { name: 'Perfil', page: 'profile', icon: FaUser, ref: useRef() },
  ];

  const router = useRouter();

  return (
    <Flex
      w="100%"
      h="fit-content"
      bg={{ base: 'menuBG', md: 'externalContentBG' }}
      p="0.5rem"
      userSelect="none"
      borderRadius="8px 8px 0 0"
      borderTop="1px"
      borderColor="externalContentBorder"
      justify="center"
      display={{ base: `flex`, md: `none` }}
    >
      <Flex w="100%" maxW="412px" justify="space-between">
        {menuItems.map((item) => (
          <Flex
            key={item.name}
            align="center"
            justify="center"
            transition="all 0.15s"
            borderRadius="lg"
            padding="0.5rem"
            cursor="pointer"
            bg={page === item.page ? 'primary300' : 'externalContentBG'}
            color={page === item.page ? 'externalContentBG' : 'primary300'}
            fontSize="1rem"
            onClick={() => router.push(`/${item.page}`)}
          >
            {item.icon && <Icon fontSize="27.875" as={item.icon} />}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
