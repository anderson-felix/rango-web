import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { logError, cookieManager } from '@/_base/utils';
import { Flex, Text, useColorMode } from '@chakra-ui/react';
import { EMPTY_USER, IUser } from '@/_base/interfaces/user';
import { EditableTextInput } from '@/components/Inputs/EditableText';
import { useAsyncCallback, useAuth } from '@/_base/hooks';
import { updateProfile } from '@/_base/services/user';
import { AppLogo } from '@/components/Logo';
import { validateSession } from '@/_base/services/auth';

interface IProps {
  user: IUser;
}

const Profile: React.FC<IProps> = ({ user }) => {
  const [profile, setProfile] = useState<IUser>(EMPTY_USER);

  const { setUser, user: authUser } = useAuth();
  const { setColorMode } = useColorMode();

  const handleUpdateProfile = useAsyncCallback(async () => {
    const updatedProfile = await updateProfile({
      name: profile.name,
      address: profile.address,
      birthdate: profile.birthdate,
      email: profile.email,
      phone: profile.phone,
    });

    setProfile((e) => ({ ...e, ...updatedProfile }));
    setUser({ ...authUser, ...updatedProfile });
  }, []);

  return (
    <Flex flex="1" direction="column" padding="1.5rem 1rem 1.5rem 1.5rem" overflow="hidden" gap="0.5rem">
      <AppLogo type="symbol" size="lg" />
      <Flex h="100%" direction="column" gap="1rem" overflow="hidden auto" pr="0.5rem">
        <EditableTextInput
          onInputChange={(name) => setProfile((e) => ({ ...e, name }))}
          value={profile.name}
          onOk={handleUpdateProfile}
          onCancel={() => setProfile((e) => ({ ...e, name: user.name }))}
        />
        <EditableTextInput placeholder="Seu e-mail" onInputChange={(email) => setProfile((e) => ({ ...e, email }))} value={profile.email || ''} />

        <Flex justify="space-around" px="1rem">
          <Flex
            border="1px"
            borderColor="gray300"
            p=".25rem .5rem"
            borderRadius="md"
            color="#1A1740"
            bg="#FCFAFF"
            onClick={() => setColorMode(`light`)}
          >
            Tema claro
          </Flex>
          <Flex
            border="1px"
            borderColor="externalContentBorder"
            p=".25rem .5rem"
            borderRadius="md"
            color="#fff"
            bg="externalContentBG"
            onClick={() => setColorMode(`dark`)}
          >
            Tema escuro
          </Flex>
        </Flex>

        <Text mb="-0.275rem" pt="1rem" color="gray400" fontSize="14px">
          Endereço
        </Text>
        <Flex direction="column" gap=".5rem" p=".5rem" borderRadius="md">
          <EditableTextInput label="CEP" />
          <EditableTextInput label="Cidade" />
          <EditableTextInput label="Estado" />
          <EditableTextInput label="Bairro" />
          <EditableTextInput label="Rua" />
          <EditableTextInput label="Nº" />
          <EditableTextInput label="Complemento" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const selectedPage = 'profile';

  try {
    cookieManager.updateToken(req);

    const user = await validateSession();

    return { props: { selectedPage, pageTitle: 'Rango - Perfil', showBackButton: false } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
