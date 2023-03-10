import { Api } from "@/providers/Api";

type GetOneParams = {
  billId: string;
};

type GetListParams = {
  orderBy?: string;
  orderByDirection?: "asc" | "desc";
};

type DeleteOneParams = {
  billId: string;
};

type UpdateParams = {
  billId: string;
  name: string;
  description?: string;
  dueDay?: number;
};

type CreateParams = {
  name: string;
  description?: string;
  dueDay?: number;
};

const getOne = ({ billId }: GetOneParams) =>
  Api.get({ path: `bills/${billId}` });

const getList = (
  { orderBy, orderByDirection }: GetListParams,
  token: string
) => {
  const queryParams = {};
  if (orderBy) Object.assign(queryParams, { orderBy });
  if (orderByDirection) Object.assign(queryParams, { orderByDirection });

  return Api.get({
    path: "bills",
    queryParams,
    token,
  });
};

const deleteOne = ({ billId }: DeleteOneParams, token: string) =>
  Api.deleteOne({ path: `bills/${billId}` });

const update = (
  { billId, name, description, dueDay }: UpdateParams,
  token: string
) => Api.put({ path: `bills/${billId}`, body: { name, description, dueDay } });

const create = (data: CreateParams, token: string) =>
  Api.post({ path: "bills", body: data, token });

export const BillService = {
  getOne,
  getList,
  deleteOne,
  update,
  create,
};
