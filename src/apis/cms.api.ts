import Http from './api';

export const createCMSTemplate = (params?: any) => {
  return Http.post('/cms', params);
};
export const createCMSDemoTemplate = (params?: any) => {
  return Http.post('/cms/demo', params);
};
export const getAllCMSTemplate = (params?: any) => {
  return Http.get('/cms', params);
};
export const getAllTemplate = (params?: any) => {
  return Http.get('/cms/demo', params);
};
export const getAllCMSTemplateById = (id?: any) => {
  return Http.get(`/cms/${id}`);
};
export const deleteCMSTemplateById = (id?: any) => {
  return Http.delete(`/cms/${id}`);
};
export const updateCMSTemplateById = (id?: any, params?: any) => {
  return Http.patch(`/cms/${id}`, params);
};

