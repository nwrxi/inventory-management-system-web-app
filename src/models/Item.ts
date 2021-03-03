import { IUserItem } from "./User";

export interface IItem {
  id: string;
  name: string;
  dateAdded: Date;
  barcode: string;
  addedBy: string;
  user: IUserItem;
}

export interface IFormItem {
  name: string;
  dateAdded: Date;
  barcode: string;
}