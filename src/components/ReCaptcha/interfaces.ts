export interface IAppReCaptchaProps {
  onChange: (token: string | null) => void;
  error?: string;
}
