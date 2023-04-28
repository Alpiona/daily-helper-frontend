type RequestParams = {
  path: string;
  queryParams?: { [key: string]: any | undefined };
  body?: { [key: string]: any };
  token?: string;
};

type BaseResponse<T = {}> = {
  errors: Array<{ message: string }>;
  data: T;
};

const prepareResponse = async (fetcher: Promise<Response>) => {
  try {
    const response = await fetcher;

    // if (response.status === 204 || response.status === 201) {
    //   return { data: {}, errors: undefined };
    // }

    const data = await response.json();

    return {
      data: data.data,
      errors: data.errors,
    };
  } catch (err: any) {
    throw new Error(err);
  }
};

const get = async <T>({
  path,
  queryParams,
  token,
}: RequestParams): Promise<BaseResponse<T>> => {
  const fetcher = fetch(`/api/${path}?` + new URLSearchParams(queryParams), {
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

const patch = async <T>({
  path,
  queryParams,
  body,
  token,
}: RequestParams): Promise<BaseResponse<T>> => {
  const fetcher = fetch(`/api/${path}` + new URLSearchParams(queryParams), {
    method: "PATCH",
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
  body,
  token,
}: RequestParams): Promise<BaseResponse<T>> => {
  const fetcher = fetch(`/api/${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  return await prepareResponse(fetcher);
};

const deleteOne = async <T>({
  path,
  token,
}: RequestParams): Promise<BaseResponse<T>> => {
  const fetcher = fetch(`/api/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await prepareResponse(fetcher);
};

export const Api = {
  get,
  post,
  patch,
  put,
  deleteOne,
};
