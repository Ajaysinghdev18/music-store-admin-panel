import { ITicket } from '../shared/types';
import Http from './api';

export const create = (ticket: ITicket) => {
  return Http.post('/tickets', ticket);
};

// @ts-ignore
export const readAll = (params?: { query?: any; projection?: any; options?: any; aggregate?: any }) => {
  return Http.get('/tickets', params);
};

export const read = (id: string) => {
  return Http.get(`/tickets/${id}`);
};

export const update = (id: string, ticket) => {
  return Http.patch(`/tickets/${id}`, ticket);
};

export const favoriteTickets = (ticketsIdArray) => {
  return Http.post('/tickets/favorite', ticketsIdArray);
};
export const archieveTickets = (ticketsIdArray) => {
  return Http.post('/tickets/archieve', ticketsIdArray);
};
export const deleteTickets = (ticketsIdArray) => {
  return Http.delete('/tickets/delete', ticketsIdArray);
};

// @ts-ignore
export const remove = (id: string): Promise<any> => {
  return Http.delete(`/tickets/${id}`);
};
