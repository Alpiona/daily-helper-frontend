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

const logIn = (data: LogInParams) => Api.post("users/login", data);

const newUser = (data: NewUserParams) => Api.post("users", data);

export const UserService = {
  logIn,
  newUser,
};
