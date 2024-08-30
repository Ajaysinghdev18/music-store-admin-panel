// Http
import Http from './api';

// Export us apis
// @ts-ignore
export const createCategory = (category): Promise<any> => {
  return Http.post('/faq/categories', category);
};

// @ts-ignore
export const createQuestion = (question): Promise<any> => {
  return Http.post('/faq/questions', question);
};

// @ts-ignore
export const readCategories = (): Promise<any> => {
  return Http.get('/faq/categories');
};

// @ts-ignore
export const readQuestions = (): Promise<any> => {
  return Http.get('/faq/questions');
};

// @ts-ignore
export const readCategory = (categoryId: string): Promise<any> => {
  return Http.get(`/faq/categories/${categoryId}`);
};

// @ts-ignore
export const readQuestion = (questionId: string): Promise<any> => {
  return Http.get(`/faq/questions/${questionId}`);
};

// @ts-ignore
export const updateCategory = (categoryId: string, category): Promise<any> => {
  return Http.patch(`/faq/categories/${categoryId}`, category);
};

// @ts-ignore
export const updateQuestion = (questionId: string, question): Promise<any> => {
  return Http.patch(`/faq/questions/${questionId}`, question);
};

// @ts-ignore
export const removeCategory = (categoryId: string): Promise<any> => {
  return Http.delete(`/faq/categories/${categoryId}`);
};

// @ts-ignore
export const removeQuestion = (questionId: string): Promise<any> => {
  return Http.delete(`/faq/questions/${questionId}`);
};
