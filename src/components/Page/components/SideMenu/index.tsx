import { Flex, Icon, Text } from '@chakra-ui/react';
import { FiShoppingBag } from 'react-icons/fi';
import { useRef } from 'react';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';

import { useCustomRouter } from '@/_base/hooks/CustomRouter';
import { dimensions } from '@/styles/global';
import { checkAddress, formatAddress, formatShortName } from '@/_base/utils';
import { ISidemenuProps, MenuItemType } from './interfaces';
import { FaStore, FaUser } from 'react-icons/fa6';
import { MdEditNote } from 'react-icons/md';

export const SideMenu: React.FC<ISidemenuProps> = ({ page, user }) => {
  const menuItems: Array<MenuItemType> = [
    { name: 'Início', page: 'home', icon: FaStore, ref: useRef() },
    { name: 'Buscar', page: 'search', icon: FaSearch, ref: useRef() },
    { name: 'Pedidos', page: 'orders', icon: FiShoppingBag, ref: useRef() },
    { name: 'Perfil', page: 'profile', icon: FaUser, ref: useRef() },
  ];

  const router = useCustomRouter();

  return (
    <Flex
      direction="column"
      bg="externalContentBG"
      minW={dimensions.navbar.width}
      maxW={dimensions.navbar.width}
      gap="2rem"
      overflow="hidden"
      h="100%"
      userSelect="none"
      borderRight="1px"
      borderColor="gray300"
      display={{ base: `none`, md: `flex` }}
    >
      <Flex direction="column" gap="2rem" flex="1">
        {/* Informações */}
        <Flex color="white" display="column" padding="0 2.5rem" gap="0.5rem" h="fit-content" mt="0.65rem">
          <Flex gap="0.25rem" mt="1rem">
            Olá,{' '}
            <Text fontWeight="500" color="primary300">
              {formatShortName(user?.name || ``, true)}
            </Text>
          </Flex>
          <Flex align="center" gap="0.25rem" cursor="pointer" opacity="0.8" onClick={() => router.push('/profile')}>
            {checkAddress(user?.address) ? (
              <Text fontWeight="500" fontSize="14px">
                Rua {formatAddress(user?.address as any)}
              </Text>
            ) : (
              <>
                <Text fontWeight="500" fontSize="14px">
                  Adicionar endereço
                </Text>
                <MdEditNote fontSize="1.125rem" />
              </>
            )}
          </Flex>
        </Flex>

        {/* Menu */}
        <Flex direction="column" gap="1rem" p="0.5rem 1rem" overflow="hidden auto" align="flex-end">
          {menuItems.map((item) => (
            <Flex key={item.name} ref={item.ref as any} w="100%" direction="column" fontWeight="600">
              <Flex
                align="center"
                padding="10px 18px"
                transition="all 0.15s"
                borderRadius="lg"
                cursor="pointer"
                _hover={{ outline: '1px solid #fafafa22' }}
                bg="surface"
                color={page === item.page ? 'primary300' : 'text'}
                fontSize="1rem"
                onClick={() => router.push(`/${item.page}`)}
              >
                {item.icon && <Icon mr="3" fontSize="16" as={item.icon} />}
                {item.name}
              </Flex>
            </Flex>
          ))}
        </Flex>

        <Flex flex="1" w="100%" direction="column" h="100%" fontWeight="600" p="2rem 1rem" justify="flex-end">
          <Flex
            align="center"
            padding="10px 18px"
            transition="all 0.15s"
            borderRadius="lg"
            cursor="pointer"
            _hover={{ outline: '1px solid #fafafa22' }}
            bg="surface"
            color="text"
            fontSize="1rem"
            gap="0.5rem"
            onClick={() => router.push(`/logout`)}
          >
            <FaSignOutAlt fontSize="16" />
            Sair
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
