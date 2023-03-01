import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const Api = axios.create({ baseURL });

export const UpdateApiAuth = (token?: string) => {
  if (token) {
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    return;
  }

  delete Api.defaults.headers.common["Authorization"];
};
