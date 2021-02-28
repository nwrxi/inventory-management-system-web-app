export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserItem {
  firstName: string;
  lastName: string;
  email: string;
}
