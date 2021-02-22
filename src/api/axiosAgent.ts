import axios, { AxiosResponse } from "axios";
import { IUser, IUserFormValues } from "../models/User";

axios.defaults.baseURL = "http://localhost:58230/api";

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
  throw error;
});

//TODO: delete later - only for development
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const User = {
  login: (user: IUserFormValues): Promise<IUser> =>
    axios
      .post(`account/login`, user)
      .then((response: AxiosResponse) => response.data),
};

export default User;
