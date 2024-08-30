import Http from './api';

export const createNewsLetter = (params?: any) => {
    return Http.post('/newsLetter', params);
};
export const getAllNewsLetter = (params?: any) => {
    return Http.get('/newsLetter', params);
};
export const getNewsLetterById = (id?: any) => {
    return Http.get(`/newsLetter/${id}`);
};
export const uploadImage = (data?: any) => {
    return Http.post('/newsLetter/upload', data);
};
export const updateNewsLettereById = (id?: any, params?: any) => {
    return Http.patch(`/newsLetter/${id}`, params);
};
export const deleteNewsLetterById = (id?: any) => {
    return Http.delete(`/newsLetter/${id}`);
};
export const sendNewsLetterToUsers = (params) => {
    return Http.post('/newsLetter/send/', params);
  };