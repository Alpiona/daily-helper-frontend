import { Api } from "@/providers/Api";

type LogInParams = {
  email: string;
  password: string;
};

type SignUpUserParams = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const logIn = async (data: LogInParams) =>
  await Api.post({ path: "users/log-in", body: data });

const signUp = async (data: SignUpUserParams) =>
  await Api.post({ path: "users", body: data });

export const UserService = {
  logIn,
  signUp,
};
