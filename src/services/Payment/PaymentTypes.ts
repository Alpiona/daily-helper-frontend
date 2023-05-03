export type Payment = {
  id: string;
  billId: string;
  value?: number;
  referenceDate: string;
  paidAt: string;
};

export type GetOneParams = {
  paymentId: string;
};

export type GetListParams = {
  billId: string;
  orderBy?: string;
  orderByDirection?: "asc" | "desc";
};

export type DeleteOneParams = {
  paymentId: string;
};

export type UpdateParams = {
  id: string;
  billId: string;
  value?: number;
  referenceDate: string;
  paidAt?: string;
};

export type CreateParams = {
  billId: string;
  value?: number;
  referenceDate: string;
  paidAt?: string;
};
