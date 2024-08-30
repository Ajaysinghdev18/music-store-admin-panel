import Http from './api';

export const readAll = () => {
  return Http.get('/service');
};

export const create = (body: object) => {
  return Http.post('/service', body);
};

export const remove = (id) => {
  return Http.delete(`/service/${id}`);
};
