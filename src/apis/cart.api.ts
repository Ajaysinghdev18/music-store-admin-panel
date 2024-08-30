// Dependencies
import Http from './api';

// Export cart apis
export const read = (query: { fingerprint: string }) => {
  return Http.get('/cart', query);
};
