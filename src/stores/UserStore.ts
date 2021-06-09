import { makeAutoObservable, runInAction } from "mobx";
import { history } from "..";
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
  selectedUser: IUser | null = null;
  userLoading: boolean = false;

  setUserLoading = (state: boolean) => {
    this.userLoading = state;
  };

  login = async (userToLogin: IUserFormValues) => {
    try {
      const user = await axiosAgent.User.login(userToLogin);
      if (user) {
        runInAction(() => (this.user = user));
        window.localStorage.setItem("token", user.token);
        history.push("/inventory");
      }
    } catch (error) {
      throw error;
    }
  };

  register = async (userToRegister: IUserFormValues) => {
    try {
      let user: IUser;
      if (this.user && this.user.isAdmin === "True") {
        user = await axiosAgent.User.registerAdmin(userToRegister);
        console.log(user);
        history.push("/inventory");
      } else {
        user = await axiosAgent.User.register(userToRegister);
        if (user) {
          runInAction(() => (this.user = user));
          window.localStorage.setItem("token", user.token);
          history.push("/inventory");
        }
      }
    } catch (error) {
      throw error;
    }
  };

  getCurrentUser = async () => {
    try {
      const user = await axiosAgent.User.currentUser();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  getUserAtId = async (id: string) => {
    this.setUserLoading(true);
    try {
      const user = await axiosAgent.User.userAtId(Object.values(id)[0]);
      runInAction(() => {
        this.selectedUser = user;
        this.setUserLoading(false);
      });
    } catch (error) {
      this.setUserLoading(false);
      throw error;
    }
  };

  logout = () => {
    this.user = null;
    window.localStorage.removeItem("token");
    history.push("/login");
  };
}
