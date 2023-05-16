import client from "@/client/api";
import { AxiosResponse } from "axios";
import {
  Bill,
  CreateParams,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
} from "./BillTypes";

const getOne = (
  { billId }: GetOneParams,
  token: string
): Promise<AxiosResponse<Bill>> =>
  client.get<Bill>(`/api/bills/${billId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getList = (
  { orderBy, orderByDirection }: GetListParams,
  token: string
) => {
  // const queryParams = {};
  // if (orderBy) Object.assign(queryParams, { orderBy });
  // if (orderByDirection) Object.assign(queryParams, { orderByDirection });

  return client.get<Bill[]>("/api/bills", {
    params: { orderBy, orderByDirection },
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteOne = ({ billId }: DeleteOneParams, token: string) =>
  client.delete(`/api/bills/${billId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const update = (
  { billId, name, description, dueDay }: UpdateParams,
  token: string
) =>
  client.put(
    `/api/bills/${billId}`,
    { name, description, dueDay },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

const create = (data: CreateParams, token: string) =>
  client.post<Bill>("/api/bills", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const BillService = {
  getOne,
  getList,
  deleteOne,
  update,
  create,
};
