import { IUser, IUserItem } from "./User";

export interface IItem {
  id: string;
  name: string;
  dateAdded: Date;
  barcode: string;
  user: IUserItem;
}
