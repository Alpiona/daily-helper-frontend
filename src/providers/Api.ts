type RequestParams = {
  path: string;
  queryParams?: { [key: string]: any };
  body?: { [key: string]: any };
};

const get = async ({ path, queryParams }: RequestParams) => {
  const response = await fetch(
    `api/proxy${path}` + new URLSearchParams(queryParams),
    {
      method: "GET",
    }
  );

  return response.json();
};

const post = async ({ path, queryParams, body }: RequestParams) => {
  const response = await fetch(
    "api/" + path + new URLSearchParams(queryParams),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return response.json();
};

const put = async ({ path, queryParams, body }: RequestParams) => {
  const response = await fetch(
    `api/proxy${path}` + new URLSearchParams(queryParams),
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
  const response = await fetch(`api/proxy${path}`, {
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
