type RequestParams = {
  path: string;
  queryParams?: { [key: string]: any | undefined };
  body?: { [key: string]: any };
  token?: string;
};

type BaseResponse<T = {}> = {
  errors?: Array<{ message: string }>;
  data: T;
};

const prepareResponse = async (fetcher: Promise<Response>) => {
  try {
    const response = await fetcher;

    console.log("STATUS", response.status);

    if (response.status === 204) {
      return { data: {}, errors: undefined };
    }

    const data = await response.json();
    console.log("🚀 ~ file: Api.ts:24 ~ prepareResponse ~ data:", data);

    return {
      data: data.data || {},
      errors: data.errors,
    };
  } catch (err: any) {
    console.log("ERROR", err);
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
  put,
  deleteOne,
};
