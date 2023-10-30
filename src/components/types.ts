export interface IUser {
  name: string;
}

export interface INotifyById {
  [key: string]: {
    id: string;
    title: string;
    content: string;
    users: IUser[];
  };
}
