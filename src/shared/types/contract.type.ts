export interface IContractDetails {
  contractHash?: string;
  contractName?: string;
  contractAddress?: string;
  tokenName: string;
  tokenSymbol: string;
  chain: string;
  network: string;
  description: string;
  transactionHash: string;
  gasUsed?: string;
  from?: string;
  packageHash?: string;
}

export interface IContract {
  _id?: string;
  contractHash?: string;
  contractName?: string;
  contractAddress?: string;
  tokenName: string;
  tokenSymbol: string;
  details: IContractDetails;
}
