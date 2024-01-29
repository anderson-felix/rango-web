import { PropsWithChildren } from 'react';

import { IPageProps } from '@/_base/hooks/Page/interfaces';
import { Flex, Text } from '@chakra-ui/react';
import { Header } from './components/Header';
import { FooterMenu } from './components/FooterMenu';
import { FiChevronLeft } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { LastViewed } from './components/LastViewed';
import { UserInfo } from './components/UserInfo';
import { SideMenu } from './components/SideMenu';

const NAKED_PAGES = ['login', 'signup', 'recover_password'];

export const PageWrapper: React.FC<PropsWithChildren<IPageProps>> = ({
  selectedPage,
  user,
  children,
  headerLabel,
  showBackButton = true,
  showLastViewed,
  showUserInfo,
  bgImgType,
}) => {
  const router = useRouter();

  return (
    <Flex
      h="100vh"
      w="100vw"
      flexDirection="column"
      bg="primaryBG"
      position="relative"
      overflow="hidden"
      zIndex="0"
      bgImg={`/backgrounds/${bgImgType}-bg.jpg`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      {!selectedPage || NAKED_PAGES.includes(selectedPage) ? (
        children
      ) : (
        <>
          <Header user={user} headerLabel={headerLabel} />
          {showLastViewed && <LastViewed />}
          {showUserInfo && <UserInfo user={user} />}
          <Flex flex="1" overflow="hidden">
            <SideMenu user={user} page={selectedPage} />

            <Flex flex="1" gap="32px" overflow="hidden">
              <Flex flex="1" height="100%" w="100%" overflow="hidden" direction="column">
                {showBackButton && (
                  <Flex cursor="pointer" fontWeight="600" color="primary700" onClick={() => router.back()} pb="0.5rem" w="fit-content">
                    <FiChevronLeft fontSize="20px" style={{ marginTop: '2px' }} />
                    <Text textAlign="left">Voltar</Text>
                  </Flex>
                )}
                {children}
              </Flex>
            </Flex>
          </Flex>
          <FooterMenu page={selectedPage} user={user} />
        </>
      )}
    </Flex>
  );
};
