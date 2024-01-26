/* eslint-disable no-console */
import { Flex, Image, Link, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';

import { useAsyncCallback, useAuth, useCustomToast, useInputHandler } from '@/_base/hooks';
import { useCustomRouter } from '@/_base/hooks/CustomRouter';
import { googleLogin, login, validateSession } from '@/_base/services/auth';
import { logError, showErrorToClient, cookieManager } from '@/_base/utils';
import { GenericButton } from '@/components/Buttons/Generic';
import { PasswordInput } from '@/components/Inputs/Password';
import { TextInput } from '@/components/Inputs/Text';
import { AppLogo } from '@/components/Logo';
import { IAuthRequest, authSchema } from '@/_base/interfaces/auth';
import { api } from '@/_base/classes/api';

const Login: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(false);

  const { errors, onInputChange, data, submit } = useInputHandler<IAuthRequest>({ schema: authSchema });
  const { setUser } = useAuth();
  const router = useCustomRouter();
  const toast = useCustomToast();

  useEffect(() => {
    setTimeout(() => setPageIsLoading(false), 4000);
  }, []);

  const handleLogin = useAsyncCallback(
    async (googleAccessToken?: string) => {
      // Prevent the user to click on the button more than one time
      setSubmitLoading(true);

      const { access_token } = googleAccessToken
        ? await googleLogin(googleAccessToken)
        : await login({
          identifier: data.identifier,
          password: data.password,
        });


      cookieManager.setToken(access_token, 7);
      api.defaults.headers.authorization = `Bearer ${access_token}`;
      setUser(await validateSession());
      router.push('/home');
    },
    [router],
    false,
    () => setSubmitLoading(false),
  );

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => await handleLogin(codeResponse.access_token),
    onError: (error) => {
      showErrorToClient(error, toast);
      console.error('Google Login Failed:', error);
    },
  });

  return pageIsLoading ? (
    <Flex position="fixed"></Flex>
  ) : (
    <Flex h="100%" width="100%" justifyContent="center" alignItems="center" boxShadow="md">
      <Flex
        w="400px"
        direction="column"
        p="1rem"
        bg="rgba(0, 0, 0, 0.2)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        border="1px"
        borderColor="gray300"
        backdropFilter="blur(5px)"
        borderRadius="10px"
        justify="center"
        align="center"
        gap="1rem"
      >
        <Flex direction="column" gap="1rem" alignSelf="center" w="100%">
          <AppLogo size="md" />

          <Text fontSize="14px" textAlign="center" color="white">
            Ainda não tem uma conta?{' '}
            <Link href="/signup" color="primary300" textDecoration="underline" _hover={{ color: 'blue600' }}>
              Cadastre-se
            </Link>
          </Text>

          <TextInput
            error={errors.identifier}
            value={data?.identifier}
            onInputChange={(v) => onInputChange('identifier', v)}
            leftElement={<FiUser style={{ color: 'white' }} />}
            color="white"
            placeholder="Nome de Usuário"
            fontSize="1.085rem"
            _placeholder={{ color: `white` }}
          />

          <PasswordInput
            error={errors.password}
            value={data?.password}
            onInputChange={(v) => onInputChange('password', v)}
            color="white"
            placeholder="Sua senha"
            fontSize="1.085rem"
            _placeholder={{ color: `white` }}
          />
        </Flex>

        <GenericButton btntype="primary" label="Entrar" onClick={() => submit(handleLogin)} isLoading={submitLoading} marginTop="8px" w="100%" />
        <Flex direction="column" w="100%" gap="0.5rem">
          <Flex position="relative" direction="column" w="100%" align="center" justify="center">
            <Flex borderBottom="1px solid #F2F4F455" w="80%" mb="0.75rem" />
            <Text zIndex="2" px="1rem" textAlign="center" fontSize="12.5px" color="white">
              Ou faça login com
            </Text>
          </Flex>

          <GenericButton
            label="Entrar com Google"
            btntype="outline"
            color="white"
            border="1px"
            fontWeight="medium"
            borderColor="gray300"
            onClick={() => handleGoogleLogin()}
            isLoading={submitLoading}
            leftIcon={<Image src="/brands/google_logo_G.png" />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const selectedPage = 'login';

  try {
    cookieManager.updateToken(req);

    await validateSession();

    return { redirect: { destination: '/home', permanent: false } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { props: { selectedPage, pageTitle: 'Login', bgImgType: `login` } };
  }
};
