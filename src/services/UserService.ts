import { Api } from "@/providers/Api";

type LogInParams = {
  email: string;
  password: string;
};

type NewUserParams = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const logIn = async (data: LogInParams) =>
  await Api.post({ path: "/users/login", body: data });

const signUp = async (data: NewUserParams) =>
  await Api.post({ path: "/users", body: data });

export const UserService = {
  logIn,
  signUp,
};
