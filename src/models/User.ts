export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  isAdmin: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
