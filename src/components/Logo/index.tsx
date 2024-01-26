import { Flex, FlexProps, Image, useColorMode } from '@chakra-ui/react';
import { ILogoProps } from './interfaces';

const sizeMapper = {
  xs: '1.5rem',
  sm: '2rem',
  md: '3rem',
  lg: '4rem',
  xl: '5.5rem',
  '2xl': '7rem',
};

export const AppLogo: React.FC<ILogoProps> = ({ size = 'md', type = 'full', theme }) => {
  const { colorMode } = useColorMode();

  return <Image src={`/logo/rango-${type}-${theme || colorMode}.svg`} h={sizeMapper[size]} />;
};

export const StoreLogo: React.FC<ILogoProps & FlexProps> = ({ size = 'md', src = ``, ...rest }) => {
  return <Flex bgImage={src} bgPosition="center" bgSize="cover" h={sizeMapper[size]} w={sizeMapper[size]} borderRadius="50%" {...rest} />;
};

export const ProfilePic: React.FC<ILogoProps & FlexProps> = ({ src = ``, ...rest }) => {
  return <Flex bgImage={src} w="100%" h="10rem" bgPosition="center" bgSize="cover" {...rest} />;
};
