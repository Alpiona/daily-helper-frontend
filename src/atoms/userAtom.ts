import { atom } from "recoil";

export interface UserState {
  token?: string;
  email?: string;
}

export const userState = atom<UserState>({
  key: "userState",
  default: {},
});
