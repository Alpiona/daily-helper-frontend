import { Api } from "@/utils/Api";
import {
  LogInData,
  LogInParams,
  ResetPasswordUserParams,
  SendResetPasswordUserParams,
  SignUpUserParams,
} from "./UserTypes";

const logIn = async (data: LogInParams) =>
  await Api.post<LogInData>({ path: "users/log-in", body: data });

const activate = async (token: string) =>
  await Api.patch({ path: "users/activate", token });

const signUp = async (data: SignUpUserParams) =>
  await Api.post({ path: "users", body: data });

const sendResetPassword = async (data: SendResetPasswordUserParams) =>
  await Api.post({ path: "users/send-reset-password", body: data });

const resetPassword = async (data: ResetPasswordUserParams, token: string) =>
  await Api.post({ path: "users/reset-password", body: data, token });

export const UserService = {
  logIn,
  activate,
  signUp,
  sendResetPassword,
  resetPassword,
};
