import { configure, makeAutoObservable } from "mobx";
import { createContext } from "react";
import CommonStore from "./CommonStore";
import UserStore from "./UserStore";

configure({ enforceActions: "always" });

export class BaseStore {
  userStore: UserStore;
  commonStore: CommonStore;
  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
  }
}

export const BaseStoreContext = createContext(new BaseStore());
