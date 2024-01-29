import { DatePicker } from '@orange_digital/chakra-datepicker';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { useAsyncCallback, useCustomRouter, useInputHandler } from '@/_base/hooks';
import IRegisterUser, { EMPTY_REGISTER_USER_DATA, registerUserSchema } from '@/_base/interfaces/user/IRegisterUser';
import { logError, cookieManager } from '@/_base/utils';
import { AppLogo } from '@/components/Logo';
import { IGoogleUserData } from '@/_base/interfaces/auth/IGoogleUserData';
import { checkEmail, signup } from '@/_base/services/user';
import { FormStep } from './components/Form';
import { FinishStep } from './components/Finish';
import { SignUpPageStepsType } from './interfaces';
import { RiArrowLeftSLine } from 'react-icons/ri';

const SizeMapper: Record<SignUpPageStepsType, string> = {
  FORM: '100%',
  FINISH: '23.5rem',
};

const SignUp: React.FC = () => {
  const [step, setStep] = useState<SignUpPageStepsType>('FORM');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isGoogleSignin, setIsGoogleSignin] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const { errors, onInputChange, data, setData, setErrors, submit } = useInputHandler<IRegisterUser>({
    data: EMPTY_REGISTER_USER_DATA,
    schema: registerUserSchema,
  });

  const router = useCustomRouter();

  useEffect(() => {
    const data = cookieManager.getCookie<IGoogleUserData>('google_data', true);

    if (data) {
      setIsGoogleSignin(true);
      setData((e) => ({ ...e, email: data.email, name: data.name }));
    }
  }, []);

  const canSubmit = useMemo(
    () => passwordIsValid && !Object.values(Object.assign(EMPTY_REGISTER_USER_DATA, { ...data, email: '_' })).filter((e) => !e).length,
    [passwordIsValid, data],
  );

  const handleRegisterUser = useAsyncCallback(
    async () => {
      if (data.password !== (data as any).password_confirmation) {
        setErrors((e) => ({ ...e, password: 'As senhas não correspondem', password_confirmation: 'As senhas não correspondem' }));
        return;
      }

      setSubmitLoading(true);
      const emailResponse = await checkEmail(data.email || '');

      if (!emailResponse.is_valid) {
        setErrors((e) => ({ ...e, email: 'E-mail já cadastrado' }));
        return;
      }

      const signupData = { ...data };

      delete (signupData as any).password_confirmation;

      await signup(signupData);

      setStep('FINISH');
    },
    [data],
    false,
    () => setSubmitLoading(false),
  );

  const PageStepElement: Record<SignUpPageStepsType, ReactNode> = {
    FORM: (
      <FormStep
        data={data}
        errors={errors}
        onInputChange={onInputChange}
        isGoogleSignin={isGoogleSignin}
        setPasswordIsValid={setPasswordIsValid}
        submit={submit}
        canSubmit={canSubmit}
        handleRegisterUser={handleRegisterUser}
        submitLoading={submitLoading}
      />
    ),
    FINISH: <FinishStep />,
  };

  return (
    <Flex my="2rem" overflow="auto" margin="auto">
      <Flex
        direction="column"
        bgColor="white"
        maxW={{ base: `100%`, sm: '420px' }}
        margin="auto"
        borderRadius="12px"
        align="center"
        padding="18px 24px 24px"
        transition="all 0.2s"
        bg="rgba(0, 0, 0, 0.25)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        border="1px"
        borderColor="gray300"
        backdropFilter="blur(5px)"
        h={SizeMapper[step]}
      >
        <AppLogo />
        <Flex alignSelf="flex-start" color="white" align="center" gap="0.25rem" _hover={{ filter: `brightness(0.8)` }} onClick={() => router.back()}>
          <RiArrowLeftSLine />
          <Text fontSize="15px" fontWeight="500">
            Voltar
          </Text>
        </Flex>

        {PageStepElement[step]}
      </Flex>
    </Flex>
  );
};

export default SignUp;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const selectedPage = 'signup';

  try {
    cookieManager.updateToken(req);

    // await validateSession();

    return { props: { selectedPage, pageTitle: 'Cadastro', bgImgType: `signup` } };
    // return { redirect: { destination: '/profile', permanent: false } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { props: { selectedPage, pageTitle: 'Cadastro', bgImgType: `signup` } };
  }
};

export const CustomDatePicker: React.FC = () => {
  return <DatePicker initialValue={new Date()} />;
};
