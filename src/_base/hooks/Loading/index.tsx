import { PropsWithChildren, useContext, useEffect, useState, createContext } from 'react';
import { Flex, Image, Slide } from '@chakra-ui/react';

import { ILoadingConfig, ILoadingContext, ILoadingProviderProps } from './interfaces';

const defaultConfig: ILoadingConfig = { isLoading: false, type: 'spinner' };

const LoadingContext = createContext<ILoadingContext>({
  loadingConfig: { ...defaultConfig },
  setLoadingConfig: () => ({}),
  runTransition: () => ({}),
});

export const LoadingProvider: React.FC<PropsWithChildren<ILoadingProviderProps>> = ({ children, changeSignal }) => {
  const [loadingConfig, setLoadingConfig] = useState({ ...defaultConfig });

  useEffect(() => {
    setLoadingConfig(() => ({ ...defaultConfig }));
  }, [changeSignal]);

  const runTransition = (time = 500) => {
    setLoadingConfig({ isLoading: true });
    setTimeout(() => setLoadingConfig({ isLoading: false }), time);
  };

  return (
    <LoadingContext.Provider value={{ loadingConfig, setLoadingConfig, runTransition }}>
      <Flex
        position="fixed"
        overflow="hidden"
        width="100vw"
        height="100vh"
        zIndex="9999"
        bg={loadingConfig.type === 'spinner' ? 'transparent' : 'primary100'}
        transition="all 0.35s"
        opacity={loadingConfig.isLoading ? '1' : '0'}
        pointerEvents={loadingConfig.isLoading ? 'auto' : 'none'}
      >
        {loadingConfig.type === 'spinner' && (
          <Slide direction="bottom" in={loadingConfig.isLoading} style={{ zIndex: 10, justifyContent: 'flex-end', display: 'flex' }}>
            <Flex>
              <Image
                src="/logo/rango-symbol-dark.svg"
                h="3rem"
                m="0 1rem 4.5rem 0"
                css={`
                  animation: letterRotation 1s linear infinite;

                  @keyframes letterRotation {
                    from {
                      transform: rotateZ(0deg);
                    }

                    to {
                      transform: rotateZ(360deg);
                    }
                  }
                `}
              />
            </Flex>
          </Slide>
        )}
      </Flex>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
