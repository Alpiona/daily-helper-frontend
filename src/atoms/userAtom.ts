import { atom } from "recoil";

export type UserState = {
  email: string;
  token: string;
};

export const userState = atom<UserState>({
  key: "userState",
  default: undefined,
});
