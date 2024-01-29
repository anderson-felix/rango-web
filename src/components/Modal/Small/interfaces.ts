import { ModalOverlayProps, ModalProps } from '@chakra-ui/react';

export interface IModalProps extends Partial<ModalProps> {
  show: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  title?: string;
  okText?: string;
  cancelText?: string;
  disableOkButton?: boolean;
  disableCancelButton?: boolean;
  overlay?: ModalOverlayProps;
  topIcon?: ModalTopIconType | React.ReactElement;
}

export const modalTopIconTypes = <const>['ray', 'checked', 'warning'];

export type ModalTopIconType = (typeof modalTopIconTypes)[number];
