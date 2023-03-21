import { atom } from "recoil";

export interface ModalState {
  handleAction: (data: any) => void;
  data?: any;
  open: boolean;
  view: ModalView;
}

export type ModalView =
  | "createBill"
  | "editBill"
  | "createPayment"
  | "editPayment";

const defaultModalState: ModalState = {
  handleAction: () => {},
  data: {},
  open: false,
  view: "createBill",
};

export const modalState = atom<ModalState>({
  key: "modalState",
  default: defaultModalState,
});
