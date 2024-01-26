import { IGenericButton } from './interfaces';

import { Button, ButtonProps } from '@chakra-ui/react';

export const GenericButton = ({ label, btntype, ...otherProps }: IGenericButton & ButtonProps) => {
  const getBtnColor = () => {
    switch (btntype) {
      case 'primary':
        return 'primary300';
      case 'outline':
        return 'transparent';
      case 'outline-white':
        return 'white';
      case 'warning':
        return '#BA1B1B';
      case 'outline-warning':
        return 'transparent';
      default:
        return 'primary900';
    }
  };

  const getBtnTextColor = () => {
    switch (btntype) {
      case 'primary':
        return 'white';
      case 'warning':
        return 'white';
      case 'outline':
        return 'primary900';
      case 'outline-warning':
        return '#BA1B1B';
      default:
        return 'primary900';
    }
  };

  const getBtnBorder = () => {
    switch (btntype) {
      case 'primary':
        return undefined;
      case 'outline':
        return '1px solid #1A1740';
      case 'outline-white':
        return '1px solid #1A1740';
      case 'warning':
        return '1px solid #BA1B1B';
      case 'outline-warning':
        return '1px solid #BA1B1B';
      default:
        return undefined;
    }
  };

  const getBtnColorHover = () => {
    switch (btntype) {
      case 'primary':
        return '#23b16a';
      case 'warning':
        return '#991919';
      default:
        return 'rgba(255,255,255,0.20)';
    }
  };

  const getBtnTextColorHover = () => {
    switch (btntype) {
      case 'primary':
        return 'white';
      case 'warning':
        return 'white';
      case 'outline-warning':
        return '#99191999';
      case 'outline':
        return 'primary700';
      default:
        return 'primary900';
    }
  };

  return (
    <Button
      bg={btntype ? getBtnColor() : 'primary900'}
      color={btntype ? getBtnTextColor() : 'white'}
      loadingText={label}
      fontWeight="500"
      borderRadius="8px"
      border={getBtnBorder()}
      letterSpacing={0.5}
      padding="0.625rem 1rem"
      _loading={{
        background: '#4A181E !important',
        color: 'white !important',
        opacity: 0.5,
      }}
      _hover={btntype ? { background: getBtnColorHover(), color: getBtnTextColorHover() } : { background: 'primary900', color: 'white' }}
      {...otherProps}
    >
      {label}
    </Button>
  );
};
