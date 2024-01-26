export const copyToClipboard = (url: string, callback?: () => void) => {
  navigator.clipboard.writeText(url);
  if (callback) callback();
};
