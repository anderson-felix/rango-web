import { DatePicker } from '@orange_digital/chakra-datepicker';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { useAsyncCallback, useInputHandler } from '@/_base/hooks';
import IRegisterUser, { EMPTY_REGISTER_USER_DATA, registerUserSchema } from '@/_base/interfaces/user/IRegisterUser';
import { logError, cookieManager } from '@/_base/utils';
import { AppLogo } from '@/components/Logo';
import { IGoogleUserData } from '@/_base/interfaces/auth/IGoogleUserData';
import { checkEmail, signup } from '@/_base/services/user';
import { FormStep } from './components/Form';
import { FinishStep } from './components/Finish';
import { SignUpPageStepsType } from './interfaces';

const SizeMapper: Record<SignUpPageStepsType, string> = {
  FORM: 'fit-content',
  FINISH: '23.5rem',
};

export const formatDateInput = (value?: string | number | Date) =>
  value ? new Date(new Date(value || 0).getTime() + 600000)?.toISOString().split('T')[0] : '';

const SignUp: React.FC = () => {
  const [step, setStep] = useState<SignUpPageStepsType>('FORM');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isGoogleSignin, setIsGoogleSignin] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const { errors, onInputChange, data, setData, setErrors, submit } = useInputHandler<IRegisterUser>({
    data: EMPTY_REGISTER_USER_DATA,
    schema: registerUserSchema,
  });

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
    <Flex
      direction="column"
      bgColor="white"
      height={{ base: `100%`, sm: "fit-content" }}
      maxW={{ base: `100%`, sm: "420px" }}
      margin={{ base: `2rem`, sm: "auto" }}
      borderRadius="12px"
      align="center"
      padding="24px"
      transition="all 0.2s"
      bg="rgba(0, 0, 0, 0.25)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      border="1px"
      borderColor="gray300"
      backdropFilter="blur(5px)"
      h={SizeMapper[step]}
    >
      <AppLogo />

      {PageStepElement[step]}
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
