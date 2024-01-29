import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { logError, cookieManager } from '@/_base/utils';
import { Flex, Text, useColorMode } from '@chakra-ui/react';
import { IUser } from '@/_base/interfaces/user';
import { EditableTextInput } from '@/components/Inputs/EditableText';
import { useAsyncCallback, useAsyncDebounce, useAuth, useCustomRouter, useCustomToast } from '@/_base/hooks';
import { updateProfile } from '@/_base/services/user';
import { AppLogo } from '@/components/Logo';
import { validateSession } from '@/_base/services/auth';
import axios from 'axios';
import { GenericButton } from '@/components/Buttons/Generic';
import { IoMdLogOut } from 'react-icons/io';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface IProps {
  user: IUser;
}

const Profile: React.FC<IProps> = ({ user }) => {
  const [profile, setProfile] = useState<IUser>(user);

  const { setUser, user: authUser } = useAuth();
  const { setColorMode } = useColorMode();
  const toast = useCustomToast();
  const router = useCustomRouter();

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

  useAsyncDebounce(
    async () => {
      const zipcode = profile.address?.zip_code?.replace(/\D/g, '');

      if (zipcode?.length === 8) {
        try {
          const { data } = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${zipcode}/json/`);

          setProfile((e) => ({
            ...e,
            address: {
              address: data.logradouro,
              number: ``,
              complement: ``,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
              country: `Brasil`,
              zip_code: zipcode,
            },
          }));
        } catch {
          toast({ status: `error`, description: `Cep não encontado` });
        }
      }
    },
    [profile.address?.zip_code],
    500,
  );

  return (
    <Flex
      flex="1"
      direction="column"
      padding="1.5rem 1rem 1.5rem 1.5rem"
      overflow="hidden"
      gap="1rem"
      w="100%"
      color="text"
      maxW={{ base: undefined, md: `70rem` }}
      margin={{ base: undefined, md: '0 auto' }}
    >
      <AppLogo type="symbol" size="lg" />
      <Flex h="100%" direction="column" gap="1rem" overflow="hidden auto" pr="0.5rem" color="text">
        <EditableTextInput
          onInputChange={(name) => setProfile((e) => ({ ...e, name }))}
          value={profile.name}
          onOk={handleUpdateProfile}
          onCancel={() => setProfile((e) => ({ ...e, name: user.name }))}
        />
        <EditableTextInput
          placeholder="Seu e-mail"
          onInputChange={(email) => setProfile((e) => ({ ...e, email }))}
          value={profile.email || ''}
          onOk={handleUpdateProfile}
          onCancel={() => setProfile((e) => ({ ...e, email: user.email }))}
        />

        <Flex justify="space-around" px="1rem">
          <Flex
            border="1px"
            borderColor="gray300"
            p=".25rem .5rem"
            borderRadius="md"
            color="#1A1740"
            bg="#FCFAFF"
            onClick={() => setColorMode(`light`)}
            cursor="pointer"
            transition="all 0.15s"
            _hover={{ boxShadow: `md` }}
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
            cursor="pointer"
            transition="all 0.15s"
            _hover={{ boxShadow: `md` }}
          >
            Tema escuro
          </Flex>
        </Flex>

        <Text mb="-0.275rem" pt="1rem" color="gray400" fontSize="14px">
          Endereço
        </Text>
        <Flex direction="column" gap=".5rem" p=".5rem" borderRadius="md">
          <EditableTextInput
            label="CEP"
            value={profile.address.zip_code || ``}
            onOk={handleUpdateProfile}
            onCancel={() => setProfile((e) => ({ ...e, address: { ...e.address, zip_code: user.address.zip_code || `` } }))}
            onInputChange={(zip_code) => setProfile((e) => ({ ...e, address: { ...e.address, zip_code } }))}
          />
          <EditableTextInput
            label="Cidade"
            value={profile.address.city || ``}
            onOk={handleUpdateProfile}
            onCancel={() => setProfile((e) => ({ ...e, address: { ...e.address, city: user.address.city || `` } }))}
            onInputChange={(city) => setProfile((e) => ({ ...e, address: { ...e.address, city } }))}
          />
          <EditableTextInput
            label="Estado"
            value={profile.address.state || ``}
            onOk={handleUpdateProfile}
            onCancel={() => setProfile((e) => ({ ...e, address: { ...e.address, state: user.address.state || `` } }))}
            onInputChange={(state) => setProfile((e) => ({ ...e, address: { ...e.address, state } }))}
          />
          <EditableTextInput
            label="Bairro"
            value={profile.address.neighborhood || ``}
            onOk={handleUpdateProfile}
            onCancel={() => setProfile((e) => ({ ...e, address: { ...e.address, neighborhood: user.address.neighborhood || `` } }))}
            onInputChange={(neighborhood) => setProfile((e) => ({ ...e, address: { ...e.address, neighborhood } }))}
          />
          <EditableTextInput
            label="Rua"
            value={profile.address.address || ``}
            onOk={handleUpdateProfile}
            onCancel={() => setProfile((e) => ({ ...e, address: { ...e.address, address: user.address.address || `` } }))}
            onInputChange={(address) => setProfile((e) => ({ ...e, address: { ...e.address, address } }))}
          />
          <EditableTextInput
            label="Nº"
            value={profile.address.number || ``}
            onOk={handleUpdateProfile}
            onCancel={() => setProfile((e) => ({ ...e, address: { ...e.address, number: user.address.number || `` } }))}
            onInputChange={(number) => setProfile((e) => ({ ...e, address: { ...e.address, number } }))}
          />
          <EditableTextInput
            label="Complemento"
            value={profile.address.complement || ``}
            onOk={handleUpdateProfile}
            onCancel={() => setProfile((e) => ({ ...e, address: { ...e.address, complement: user.address.complement || `` } }))}
            onInputChange={(complement) => setProfile((e) => ({ ...e, address: { ...e.address, complement } }))}
          />
        </Flex>
      </Flex>
      <GenericButton
        display={{ base: 'flex', md: `none` }}
        label="Sair"
        btntype="outline-warning"
        size="sm"
        w="fit-content"
        margin="auto"
        rightIcon={<IoMdLogOut fontSize="18px" />}
        onClick={() => router.push(`/logout`)}
      />
    </Flex>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const selectedPage = 'profile';

  try {
    cookieManager.updateToken(req);

    const user = await validateSession();

    return { props: { selectedPage, pageTitle: 'Rango - Perfil', user, showBackButton: false } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
