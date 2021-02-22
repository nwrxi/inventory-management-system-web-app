import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import axiosAgent from "../api/axiosAgent";
import { IUser, IUserFormValues } from "../models/User";
import { BaseStore } from "./BaseStore";

export default class UserStore {
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    makeAutoObservable(this);
    this.baseStore = baseStore;
  }

  user: IUser | null = null;

  login = async (userToLogin: IUserFormValues) => {
    try {
      const user = await axiosAgent.login(userToLogin);
      if (user) {
        runInAction(() => (this.user = user));
      }
      window.localStorage.setItem("token", user.token);
    } catch (error) {
      throw error;
    }
  };
}
