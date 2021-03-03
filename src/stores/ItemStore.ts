import { makeAutoObservable, runInAction } from "mobx";
import axiosAgent from "../api/axiosAgent";
import { BaseStore } from "./BaseStore";

export default class ItemStore {
  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    makeAutoObservable(this);
    this.baseStore = baseStore;
  }

  itemsMap = new Map();
  itemsLoading: boolean = true;

  setItemsLoading = (loading: boolean) => {
    this.itemsLoading = loading;
  };

  getItems = async () => {
    try {
      const items = await axiosAgent.Item.getItems();
      runInAction(() => {
        items.forEach((item) => {
          item.dateAdded = new Date(item.dateAdded);
          item.addedBy = item.user.firstName + " " + item.user.lastName;
          this.itemsMap.set(item.id, item);
        });
      });
    } catch (error) {
      this.baseStore.commonStore.setLoading(false);
      console.log(error);
    }
  };
}
