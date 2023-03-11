type RequestParams = {
  path: string;
  queryParams?: { [key: string]: any | undefined };
  body?: { [key: string]: any };
  token?: string;
};

type BaseResponse<T = {}> = {
  errors?: Array<{ message: string }>;
  status: number;
  data: T;
};

const prepareResponse = (fetcher: Promise<Response>) =>
  fetcher
    .then(async (response) =>
      response.json().then((data) => {
        return { data, status: response.status, errors: data.errors || [] };
      })
    )
    .catch((err) => {
      throw new Error(err);
    });

const get = async <T>({
  path,
  queryParams,
  token,
}: RequestParams): Promise<BaseResponse<T>> => {
  const fetcher = fetch(`/api/${path}` + new URLSearchParams(queryParams), {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await prepareResponse(fetcher);
};

const post = async <T>({
  path,
  queryParams,
  body,
  token,
}: RequestParams): Promise<BaseResponse<T>> => {
  const fetcher = fetch(`/api/${path}` + new URLSearchParams(queryParams), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  return await prepareResponse(fetcher);
};

const put = async <T>({
  path,
  queryParams,
  body,
}: RequestParams): Promise<BaseResponse<T>> => {
  const fetcher = fetch(`/api/${path}` + new URLSearchParams(queryParams), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await prepareResponse(fetcher);
};

const deleteOne = async <T>({
  path,
}: RequestParams): Promise<BaseResponse<T>> => {
  const fetcher = fetch(`/api/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await prepareResponse(fetcher);
};

export const Api = {
  get,
  post,
  put,
  deleteOne,
};
