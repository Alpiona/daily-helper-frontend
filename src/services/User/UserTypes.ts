export type LogInParams = {
  email: string;
  password: string;
};

export type LogInData = {
  token: string;
  expiresAt: string;
};

export type SignUpUserParams = {
  email: string;
  password: string;
  passwordConfirmation: string;
  locale: string;
};

export type SendResetPasswordUserParams = {
  email: string;
};

export type ResetPasswordUserParams = {
  password: string;
  passwordConfirmation: string;
};
