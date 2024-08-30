// Dependencies
import Http from './api';

// Export transaction apis
export const read = (params: any) => {
  return Http.get('/transaction', params);
};
