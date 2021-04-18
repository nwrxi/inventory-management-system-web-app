import axios, { AxiosResponse } from "axios";
import { history } from "..";
import { IFormItem, IItem } from "../models/Item";
import { IUser, IUserFormValues } from "../models/User";

axios.defaults.baseURL = "http://localhost:5000/api";

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
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/NotFound");
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

//TODO: delete later - only for development
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );
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
    currentUser: (): Promise<IUser> =>
      axios
        .get(`account/`)
        .then(sleep(1000))
        .then((response: AxiosResponse) => response.data),
    userAtId: (id: string): Promise<IUser> =>
      axios
        .get(`account/${id}`)
        .then(sleep(1000))
        .then((response: AxiosResponse) => response.data),
  },

  Item: {
    getItems: (): Promise<IItem[]> =>
      axios
        .get(`items`)
        .then(sleep(1000))
        .then((response: AxiosResponse) => response.data),
    addItem: (item: IFormItem): Promise<IItem> =>
      axios
        .post(`items`, item)
        .then(sleep(1000))
        .then((response: AxiosResponse) => response.data),
  },
};

export default axiosAgent;
