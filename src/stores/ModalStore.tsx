import { makeAutoObservable } from "mobx";
import { BaseStore } from "./BaseStore";

export default class ModalStore {
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    makeAutoObservable(this);
    this.baseStore = baseStore;
  }

  isShowing: boolean = false;
  isEditShowing: boolean = false;

  setEditShow = (state: boolean) => {
    this.isEditShowing = state;
  };
  setShow = (state: boolean) => {
    this.isShowing = state;
  };
}
