import { IUserItem } from "./User";

export interface IItem {
  id: string;
  name: string;
  description: string;
  dateAdded: Date;
  barcode: string;
  addedBy: string;
  user: IUserItem;
}

export interface IFormItem {
  name: string;
  description: string;
  dateAdded: string;
  barcode: string;
}
