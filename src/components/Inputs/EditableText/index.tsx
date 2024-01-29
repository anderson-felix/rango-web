import { ButtonGroup, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, Text, useEditableControls } from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa6';

import { IInputProps } from '../interfaces';

type EditableControlsType = { onOk?: () => void; onCancel?: () => void };

export const EditableTextInput: React.FC<IInputProps & EditableControlsType> = ({
  onInputChange,
  value = '',
  placeholder,
  label,
  error,
  onOk,
  onCancel,
  ...rest
}) => {
  return (
    <Flex direction="column" color="text" bg="primaryBG">
      {!!label && (
        <Text color="gray700" fontSize="13.5px" fontWeight="500" pb="0.25rem">
          {label}
        </Text>
      )}
      <Flex borderBottom="1px" borderColor="gray300">
        <Editable
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          gap="1rem"
          defaultValue="Rasengan ⚡️"
          isPreviewFocusable={false}
          placeholder={placeholder}
          value={value}
          border="none"
          padding="5px 10px"
          bg="primaryBG"
          borderRadius="8px"
          variant="unstyled"
          fontSize="16px"
        >
          <EditablePreview />
          {/* Here is the custom input */}
          <Input as={EditableInput} {...rest} isInvalid={!!error} onChange={(e) => onInputChange && onInputChange(e.target.value)} color="gray600" />
          <EditableControls onOk={onOk} onCancel={onCancel} isDisabled={!!rest.isDisabled} />
        </Editable>
      </Flex>
      {!!error && (
        <Flex align="center" gap="0.25rem" pl="0.15rem" color="error500">
          <Text fontSize="12.5px">{error}</Text>
        </Flex>
      )}
    </Flex>
  );
};

function EditableControls({ onOk, onCancel, isDisabled }: EditableControlsType & { isDisabled: boolean }) {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm" color="gray600">
      <IconButton
        aria-label="1"
        icon={<FaCheck />}
        {...getSubmitButtonProps()}
        onClick={() => {
          (getSubmitButtonProps() as any).onClick();
          if (onOk) onOk();
        }}
      />
      <IconButton
        aria-label="2"
        icon={<IoClose />}
        {...getCancelButtonProps()}
        onClick={() => {
          (getCancelButtonProps() as any).onClick();
          if (onCancel) onCancel();
        }}
      />
    </ButtonGroup>
  ) : isDisabled ? null : (
    <Flex justifyContent="center" color="gray600">
      <IconButton aria-label="3" size="sm" icon={<FiEdit2 size="1rem" color="#757e8b" />} {...getEditButtonProps()} bg="transparent" />
    </Flex>
  );
}
