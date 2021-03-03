import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import CommonStore from "./CommonStore";
import ItemStore from "./ItemStore";
import UserStore from "./UserStore";
import ModalStore from "./ModalStore";

export class BaseStore {
  userStore: UserStore;
  commonStore: CommonStore;
  itemStore: ItemStore;
  modalStore: ModalStore;
  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.itemStore = new ItemStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const BaseStoreContext = createContext(new BaseStore());
