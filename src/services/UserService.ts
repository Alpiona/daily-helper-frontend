import { Api } from "@/utils/Api";

type LogInParams = {
  email: string;
  password: string;
};

type LogInData = {
  token: string;
  expiresAt: string;
};

type SignUpUserParams = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const logIn = async (data: LogInParams) =>
  await Api.post<LogInData>({ path: "users/log-in", body: data });

const signUp = async (data: SignUpUserParams) =>
  await Api.post<undefined>({ path: "users", body: data });

export const UserService = {
  logIn,
  signUp,
};
