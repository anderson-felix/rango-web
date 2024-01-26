import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import 'moment/locale/pt-br';

import { api } from '@/_base/classes/api';
import { CustomRouterProvider } from '@/_base/hooks/CustomRouter';
import { LoadingProvider } from '@/_base/hooks/Loading';
import { Page } from '@/_base/hooks/Page';
import { cookieManager } from '@/_base/utils';
import { globalTheme } from '@/styles/global';

export default function App({ Component, pageProps }: AppProps) {
  const token = cookieManager.getToken();
  api.defaults.headers.authorization = `Bearer ${token}`;

  return (
    <GoogleOAuthProvider clientId="47490597990-gfmoh1pha85b9qi3b19fg3t75ebb0rm2.apps.googleusercontent.com">
      <ChakraProvider theme={globalTheme}>
        <LoadingProvider changeSignal={{}}>
          <CustomRouterProvider>
            <Page {...pageProps}>
              <Component {...pageProps} />
              <CSSReset />
            </Page>
          </CustomRouterProvider>
        </LoadingProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}
