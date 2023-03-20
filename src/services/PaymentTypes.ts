export type Payment = {
  id: string;
  value: number | null;
  referenceDate: Date;
  paidAt: Date;
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

export type CreateParams = {};
