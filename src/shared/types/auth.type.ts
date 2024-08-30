export interface IUserInfo {
  email: string;
  password: string;
}

export interface IAccount {
  id: string;
  name: string;
  email: string;
  verify: string;
  role: string;
  artistId?: string;
}
