import { Api } from "@/utils/Api";
import {
  CreateParams,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  Payment,
  UpdateParams,
} from "./PaymentTypes";

const getOne = ({ paymentId }: GetOneParams, token: string) =>
  Api.get<Payment>({ path: `payments/${paymentId}`, token });

const getList = (
  { orderBy, orderByDirection }: GetListParams,
  token: string
) => {
  const queryParams = {};
  if (orderBy) Object.assign(queryParams, { orderBy });
  if (orderByDirection) Object.assign(queryParams, { orderByDirection });

  return Api.get<Payment[]>({
    path: "payments",
    queryParams,
    token,
  });
};

const deleteOne = ({ paymentId }: DeleteOneParams, token: string) =>
  Api.deleteOne({ path: `payments/${paymentId}`, token });

const update = ({ paymentId }: UpdateParams, token: string) =>
  Api.put({
    path: `payments/${paymentId}`,
    body: {},
    token,
  });

const create = (data: CreateParams, token: string) =>
  Api.post({ path: "payments", body: data, token });

export const PaymentService = {
  getOne,
  getList,
  deleteOne,
  update,
  create,
};
