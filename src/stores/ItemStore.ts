import { makeAutoObservable, runInAction } from "mobx";
import axiosAgent from "../api/axiosAgent";
import { BaseStore } from "./BaseStore";
import { IFormItem, IItem } from "../models/Item";

export default class ItemStore {
  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    makeAutoObservable(this);
    this.baseStore = baseStore;
  }

  selectedItem: IItem | null = null;

  itemsMap = new Map();
  itemsLoading: boolean = true;
  itemLoading: boolean = true;

  setItemsLoading = (loading: boolean) => {
    this.itemsLoading = loading;
  };

  setItemLoading = (loading: boolean) => {
    this.itemLoading = loading;
  };

  getItem = async (id: string) => {
    this.setItemLoading(true);
    try {
      const item = await axiosAgent.Item.getItem(Object.values(id)[0]);
      runInAction(() => {
        this.selectedItem = item;
        this.setItemLoading(false);
      });
    } catch (error) {
      this.setItemLoading(false);
      throw error;
    }
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

  addItem = async (item: IFormItem) => {
    try {
      const addedItem = await axiosAgent.Item.addItem(item);
      runInAction(() => {
        addedItem.dateAdded = new Date(item.dateAdded);
        addedItem.addedBy =
          addedItem.user.firstName + " " + addedItem.user.lastName;
        this.itemsMap.set(addedItem.id, addedItem);
      });
    } catch (error) {
      throw error;
    }
  };
}
