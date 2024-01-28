import { GenericButton } from '@/components/Buttons/Generic';
import { DateInput } from '@/components/Inputs/Date';
import { PasswordInput } from '@/components/Inputs/Password';
import { TextInput } from '@/components/Inputs/Text';
import { Flex, Text } from '@chakra-ui/react';
import { MdMailOutline } from 'react-icons/md';
import { InputHandlerErrorType } from '@/_base/hooks/InputHandler/interfaces';
import IRegisterUser from '@/_base/interfaces/user/IRegisterUser';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
  isGoogleSignin: boolean;
  canSubmit: boolean;
  submitLoading: boolean;
  data: IRegisterUser;
  errors: InputHandlerErrorType<IRegisterUser>;
  setPasswordIsValid: Dispatch<SetStateAction<boolean>>;
  onInputChange: (field: keyof IRegisterUser, value: any) => void;
  submit: (cb: (args?: any) => any) => void;
  handleRegisterUser: () => Promise<void>;
}

export const FormStep: React.FC<IProps> = ({
  data,
  errors,
  onInputChange,
  isGoogleSignin,
  setPasswordIsValid,
  submit,
  canSubmit,
  handleRegisterUser,
  submitLoading,
}) => {
  return (
    <Flex direction="column" h="100%" justify="space-between" align="center" gap="1.25rem" overflow="auto">
      <Flex direction="column" gap="8px" marginTop="2rem">
        <Text fontWeight="600" fontSize="20px" color="white">
          Informe os seus dados
        </Text>
        <Text color="white" fontWeight="500">
          Faça o cadastro e desfrute de uma experiência completa
        </Text>
      </Flex>
      <Flex //Inputs
        direction="column"
        width="100%"
        gap="12px"
      >
        <TextInput
          label="Nome Completo"
          value={data.name}
          error={errors.name}
          color="white"
          isDisabled={!!isGoogleSignin}
          onInputChange={(value) => {
            onInputChange('name', value);
          }}
        />

        <TextInput
          label="E-mail"
          value={data.email}
          isDisabled={!!isGoogleSignin}
          error={errors.email}
          color="white"
          onInputChange={(value) => onInputChange('email', value)}
          leftElement={<MdMailOutline color="white" />}
        />

        <TextInput
          label="Telefone"
          value={data.phone}
          isDisabled={isGoogleSignin}
          error={errors.phone}
          color="white"
          onInputChange={(value) => onInputChange('phone', value)}
          leftElement={<MdMailOutline color="white" />}
        />

        <DateInput
          label="Data de Nascimento"
          value={formatDateInput(data.birthdate)}
          color="white"
          error={errors.birthdate}
          onInputChange={(value) => onInputChange('birthdate', value ? new Date(value) : '')}
        />

        <PasswordInput
          label="Senha"
          error={errors.password}
          value={data?.password}
          onInputChange={(value) => onInputChange('password', value)}
          color="white"
          passStrong={2}
          onPassStrongReached={() => setPasswordIsValid(true)}
          onPassStrongUnreached={() => setPasswordIsValid(false)}
        />

        <PasswordInput
          label="Confirmar Senha"
          error={(errors as any).password_confirmation}
          color="white"
          value={(data as any)?.password_confirmation}
          onInputChange={(v) => onInputChange('password_confirmation' as any, v)}
        />
      </Flex>

      <GenericButton
        label="Cadastrar"
        btntype="primary"
        onClick={() => submit(handleRegisterUser)}
        isLoading={submitLoading}
        marginTop="8px"
        w="100%"
        isDisabled={!canSubmit}
        _disabled={{ opacity: 0.75 }}
      />
    </Flex>
  );
};

const formatDateInput = (value?: string | number | Date) =>
  value ? new Date(new Date(value || 0).getTime() + 600000)?.toISOString().split('T')[0] : '';
