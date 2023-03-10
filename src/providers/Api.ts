type RequestParams = {
  path: string;
  queryParams?: { [key: string]: any | undefined };
  body?: { [key: string]: any };
  token?: string;
};

const baseUrl = process.env.API_URL || "/api/";

const get = async ({ path, queryParams, token }: RequestParams) => {
  const response = await fetch(
    baseUrl + path + new URLSearchParams(queryParams),
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

const post = async ({ path, queryParams, body, token }: RequestParams) => {
  const response = await fetch(
    baseUrl + path + new URLSearchParams(queryParams),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  return response.json();
};

const put = async ({ path, queryParams, body }: RequestParams) => {
  const response = await fetch(
    baseUrl + path + new URLSearchParams(queryParams),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return response.json();
};

const deleteOne = async ({ path }: RequestParams) => {
  const response = await fetch(baseUrl + path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const Api = {
  get,
  post,
  put,
  deleteOne,
};
