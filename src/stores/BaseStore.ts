import { configure, makeAutoObservable } from "mobx";
import { createContext } from "react";
import UserStore from "./UserStore";

configure({ enforceActions: "always" });

export class BaseStore {
  userStore: UserStore;
  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
  }
}

export const BaseStoreContext = createContext(new BaseStore());
