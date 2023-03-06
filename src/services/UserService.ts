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
  await Api.post({ path: "/api/proxy/login", body: data });

const newUser = async (data: NewUserParams) =>
  await Api.post({ path: "/api/proxy/signup", body: data });

export const UserService = {
  logIn,
  newUser,
};
