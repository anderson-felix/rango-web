import { Button, Flex } from '@chakra-ui/react';
import { FaPaperclip } from 'react-icons/fa6';
import { Uploader } from 'rsuite';

interface IFileInputProps {
  onChange: (files: File[]) => void;
  fileUrl?: string;
  type?: 'image' | 'video';
}

export const FileInput: React.FC<IFileInputProps> = ({ type, onChange }) => {
  return (
    <Flex direction="column" w="100%" overflow="hidden">
      <Uploader
        autoUpload={false}
        accept={`${type}/*`}
        draggable
        action=""
        multiple
        onChange={(e) => {
          onChange(e.map((file) => file.blobFile as File));
        }}
        toggleAs={(e) => (
          <Button gap="8px" onClick={() => e.onClick(e)} w="100%">
            <FaPaperclip />
            Anexar arquivo
          </Button>
        )}
      />
    </Flex>
  );
};
