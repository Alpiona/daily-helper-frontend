import { atom } from "recoil";

export interface BillModalState {
  open: boolean;
  view: BillModalView;
  billId?: string;
}

export type BillModalView = "createBill" | "editBill";

const defaultModalState: BillModalState = {
  open: false,
  view: "createBill",
};

export const billModalState = atom<BillModalState>({
  key: "billModalState",
  default: defaultModalState,
});
