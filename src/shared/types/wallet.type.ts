interface IWalletAccount {
  type: string;
  icon: any;
  amount: number;
}

export interface IWallet {
  _id?: string;
  name: string;
  icon?: any;
  accounts: IWalletAccount[];
  isConnected: boolean;
  default: boolean;
  chain: string;
  address: string;
  privateKey: string;
  balance?: number;
  nfts?: any;
}
