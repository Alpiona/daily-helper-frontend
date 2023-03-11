import { Api } from "@/providers/Api";
import {
  Bill,
  CreateParams,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
} from "./BillTypes";

const getOne = ({ billId }: GetOneParams) =>
  Api.get<Bill>({ path: `bills/${billId}` });

const getList = (
  { orderBy, orderByDirection }: GetListParams,
  token: string
) => {
  const queryParams = {};
  if (orderBy) Object.assign(queryParams, { orderBy });
  if (orderByDirection) Object.assign(queryParams, { orderByDirection });

  return Api.get<Bill[]>({
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
