import { atom } from "recoil";

export interface PaymentModalState {
  open: boolean;
  view: PaymentModalView;
}

export type PaymentModalView = "createPayment" | "editPayment";

const defaultModalState: PaymentModalState = {
  open: false,
  view: "createPayment",
};

export const paymentModalState = atom<PaymentModalState>({
  key: "paymentModalState",
  default: defaultModalState,
});
