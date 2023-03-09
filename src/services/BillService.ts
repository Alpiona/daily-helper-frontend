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
  Api.get({ path: `/bills/${billId}` });

const getList = (data?: GetListParams) =>
  Api.get({ path: "/bills", queryParams: data });

const deleteOne = ({ billId }: DeleteOneParams) =>
  Api.deleteOne({ path: `/bills/${billId}` });

const update = ({ billId, name, description, dueDay }: UpdateParams) =>
  Api.put({ path: `/bills/${billId}`, body: { name, description, dueDay } });

const create = (data: CreateParams) => Api.post({ path: "/bills", body: data });

export const BillService = {
  getOne,
  getList,
  deleteOne,
  update,
  create,
};
