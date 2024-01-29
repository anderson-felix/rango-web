import {
  Box,
  Modal as ChakraModal,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { GenericButton } from '../../Buttons/Generic';
import { IModalProps } from './interfaces';

export const SmallModal: React.FC<PropsWithChildren<IModalProps>> = ({
  show,
  title,
  onConfirm,
  onCancel,
  onClose,
  children,
  okText,
  cancelText,
  disableCancelButton = false,
  disableOkButton = false,
  overlay = {},
  topIcon,
  ...rest
}) => {
  return (
    <ChakraModal
      {...rest}
      isOpen={show}
      onClose={() => {
        if (onCancel) onCancel();
        if (onClose) onClose();
      }}
      scrollBehavior="inside"
    >
      <ModalOverlay {...overlay} />
      <ModalContent w={!rest.size ? 'fit-content' : undefined} zIndex="9998" color="text">
        {typeof topIcon === 'string' ? (
          <Box m="1rem 0 0 1rem">
            <Image src={`/icons/${topIcon}.svg`} h="48px" />
          </Box>
        ) : (
          topIcon || null
        )}
        <ModalHeader fontSize="1rem" p="0.5rem 1rem">
          {title}
        </ModalHeader>
        {!!onClose && <ModalCloseButton isDisabled={disableCancelButton} />}
        <ModalBody>{children}</ModalBody>

        <ModalFooter p="1rem" justifyContent="center" gap="1rem">
          {!!onCancel && (
            <GenericButton
              px="1.5rem"
              borderColor="gray300"
              label={cancelText || 'Cancelar'}
              onClick={onCancel}
              btntype="outline"
              isDisabled={disableCancelButton}
            />
          )}
          {!!onConfirm && (
            <GenericButton
              px="1.5rem"
              border="none"
              fontWeight="500"
              fontSize="1rem"
              label={okText || 'Confirmar'}
              onClick={() => onConfirm && onConfirm()}
              isDisabled={disableOkButton}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
