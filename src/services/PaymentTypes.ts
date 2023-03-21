export type Payment = {
  id: string;
  billId: string;
  value?: number;
  referenceDate: Date;
  paidAt?: Date;
};

export type GetOneParams = {
  paymentId: string;
};

export type GetListParams = {
  orderBy?: string;
  orderByDirection?: "asc" | "desc";
};

export type DeleteOneParams = {
  paymentId: string;
};

export type UpdateParams = {
  paymentId: string;
};

export type CreateParams = {
  billId: string;
  value?: number;
  referenceDate: Date;
  paidAt?: Date;
};
