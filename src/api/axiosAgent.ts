import axios, { AxiosResponse } from "axios";
import { history } from "..";
import { IFormItem, IItem } from "../models/Item";
import { IUser, IUserFormValues } from "../models/User";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    history.push("/ServerError");
  }
  const { status, data, config, headers } = error.response;
  if (status === 404) {
    history.push("/NotFound");
  }
  if (
    status === 401 &&
    headers["www-authenticate"].includes(
      'Bearer error="invalid_token", error_description="The token expired at'
    )
  ) {
    window.localStorage.removeItem("token");
    history.push("/login");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/NotFound");
  }
  if (status === 500) {
    history.push("/ServerError");
  }
  throw error;
});

const axiosAgent = {
  User: {
    login: (user: IUserFormValues): Promise<IUser> =>
      axios
        .post(`account/login`, user)
        .then((response: AxiosResponse) => response.data),
    register: (user: IUserFormValues): Promise<IUser> =>
      axios
        .post(`account/register`, user)
        .then((response: AxiosResponse) => response.data),
    registerAdmin: (user: IUserFormValues): Promise<IUser> =>
      axios
        .post(`account/registerAdmin`, user)
        .then((response: AxiosResponse) => response.data),
    currentUser: (): Promise<IUser> =>
      axios.get(`account/`).then((response: AxiosResponse) => response.data),
    userAtId: (id: string): Promise<IUser> =>
      axios
        .get(`account/${id}`)
        .then((response: AxiosResponse) => response.data),
  },

  Item: {
    getItems: (): Promise<IItem[]> =>
      axios.get(`items`).then((response: AxiosResponse) => response.data),
    getItem: (id: string): Promise<IItem> =>
      axios.get(`items/${id}`).then((response: AxiosResponse) => response.data),
    addItem: (item: IFormItem): Promise<IItem> =>
      axios
        .post(`items`, item)
        .then((response: AxiosResponse) => response.data),
    deleteItem: (id: string): Promise<IItem> =>
      axios
        .delete(`items/${id}`)
        .then((response: AxiosResponse) => response.data),
    editItem: (item: IItem) =>
      axios
        .put(`items/${item.id}`, item)
        .then((response: AxiosResponse) => response.data),
  },
};

export default axiosAgent;
