export type Bill = {
  id: string;
  name: string;
  description: string;
  due_day?: number;
  paid_at?: string;
};

export type GetOneParams = {
  billId: string;
};

export type GetListParams = {
  orderBy?: string;
  orderByDirection?: "asc" | "desc";
};

export type DeleteOneParams = {
  billId: string;
};

export type UpdateParams = {
  billId: string;
  name: string;
  description?: string;
  dueDay?: number;
};

export type CreateParams = {
  name: string;
  description?: string;
  dueDay?: number;
};
