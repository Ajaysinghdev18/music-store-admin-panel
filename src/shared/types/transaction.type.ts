export interface ITransaction {
  _id: string;
  userId: string;
  type: string;
  currency: string;
  address: string;
  status: string;
  createdAt: string;
  __v: number;
  amount: number;
  txKey: string;
  to: string;
  network: string;
}
