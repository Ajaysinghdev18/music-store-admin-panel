
import Http from './api';

export const updateAuctionStatus = (auctionId: string, bidId: string, status: string, userId: string) => {
  return Http.post(`/auction/status/${auctionId}`, { bidId, status, userId });
};
