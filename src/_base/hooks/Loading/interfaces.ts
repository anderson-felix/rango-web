export interface ILoadingConfig {
  isLoading: boolean;
  type?: HookLoadingType;
}

export interface ILoadingContext {
  loadingConfig: ILoadingConfig;
  setLoadingConfig: React.Dispatch<React.SetStateAction<ILoadingConfig>>;
  runTransition: (time?: number) => void;
}

export interface ILoadingProviderProps {
  changeSignal?: any;
}

export type HookLoadingType = 'spinner' | 'fullscreen' | 'fullscreen-with-info';
