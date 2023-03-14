import { atom } from "recoil";

export const tokenState = atom<string>({
  key: "authState",
  default: "",
});
