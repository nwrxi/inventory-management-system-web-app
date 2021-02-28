import { makeAutoObservable } from "mobx";
import { BaseStore } from "./BaseStore";

export default class CommonStore {
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    makeAutoObservable(this);
    this.baseStore = baseStore;
  }

  loading: boolean = true;

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };
}
