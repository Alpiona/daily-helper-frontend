type QueryParams = {
  [key: string]: any;
};

type BodyParams = {
  [key: string]: any;
};

type GetParams = {
  path: string;
  queryParams?: QueryParams;
};

type PostParams = {
  path: string;
  queryParams?: QueryParams;
  body?: BodyParams;
};

const get = async ({ path, queryParams }: GetParams) => {
  const response = await fetch(path + new URLSearchParams(queryParams), {
    method: "GET",
  });

  return response.json();
};

const post = async ({ path, queryParams, body }: PostParams) => {
  const response = await fetch(path + new URLSearchParams(queryParams), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

export const Api = {
  get,
  post,
};
