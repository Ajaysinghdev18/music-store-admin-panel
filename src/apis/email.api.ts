import Http from './api';

export const createEmailTemplate = (params?: any) => {
  return Http.post('/email', params);
};
export const getAllEmailTemplate = (params?: any) => {
  return Http.get('/email', params);
};
export const getAllEmailTemplateById = (id?: any) => {
  return Http.get(`/email/${id}`);
};
export const deleteEmailTemplateById = (id?: any) => {
  return Http.delete(`/email/${id}`);
};
export const sendEmailToUsers = (params) => {
  return Http.post('/email/send/', params);
};

export const updateEmailTemplateById = (id?: any, params?: any) => {
  return Http.patch(`/email/${id}`, params);
};
export const uploadImage = (data?: any) => {
  return Http.post('/email/upload', data);
};
