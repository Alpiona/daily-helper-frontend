import client from "@/client/api";
import {
  CreateParams,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  Payment,
  UpdateParams,
} from "./PaymentTypes";

const getOne = ({ paymentId }: GetOneParams, token: string) =>
  client.get<Payment>(`/api/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getList = (
  { billId, orderBy, orderByDirection }: GetListParams,
  token: string
) => {
  // const queryParams = { billId };
  // if (orderBy) Object.assign(queryParams, { orderBy });
  // if (orderByDirection) Object.assign(queryParams, { orderByDirection });
  return client.get<Payment[]>("/api/payments", {
    params: { billId, orderBy, orderByDirection },
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteOne = ({ paymentId }: DeleteOneParams, token: string) =>
  client.delete(`/api/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const update = (payment: UpdateParams, token: string) =>
  client.put<Payment>(`/api/payments/${payment.id}`, payment, {
    headers: { Authorization: `Bearer ${token}` },
  });

const create = (data: CreateParams, token: string) =>
  client.post<Payment>("/api/payments", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const PaymentService = {
  getOne,
  getList,
  deleteOne,
  update,
  create,
};
