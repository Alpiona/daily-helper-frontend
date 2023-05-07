import { atom } from "recoil";

export interface SideNavbarState {
  isOpen: boolean;
}

const defaultSideNavbarState: SideNavbarState = {
  isOpen: false,
};

export const sideNavbarState = atom<SideNavbarState>({
  key: "sideNavbarState",
  default: defaultSideNavbarState,
});
