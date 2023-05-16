import client from "@/client/api";
import {
  LogInData,
  LogInParams,
  ResetPasswordUserParams,
  SendResetPasswordUserParams,
  SignUpUserParams,
} from "./UserTypes";

const logIn = (data: LogInParams) =>
  client.post<LogInData>("/api/users/log-in", data);

const activate = async ({}, token: string) =>
  client.patch("/api/users/activate", {
    headers: { Authorization: `Bearer ${token}` },
  });

const signUp = async (data: SignUpUserParams) =>
  client.post("/api/users", data);

const sendResetPassword = async (data: SendResetPasswordUserParams) =>
  client.post("/api/users/send-reset-password", data);

const resetPassword = async (data: ResetPasswordUserParams, token: string) =>
  client.post("/api/users/reset-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const UserService = {
  logIn,
  activate,
  signUp,
  sendResetPassword,
  resetPassword,
};
