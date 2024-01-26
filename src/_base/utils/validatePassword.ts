export const validatePassword = (password: string): boolean => {
  const passwordValidator = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9,.!@#$%^&*]{8,64}$/;

  return passwordValidator.test(password);
};
