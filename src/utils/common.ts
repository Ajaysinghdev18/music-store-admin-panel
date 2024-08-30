import { REACT_APP_API_ASSETS_SERVER } from '../constants';

// @ts-ignore
export const getThumbnailImage = (values: any) => {
  return `${REACT_APP_API_ASSETS_SERVER}/${values.thumbnail?.fieldname}/${values.thumbnail?.filename}`;
};

// @ts-ignore
export const getUserAvatar = (values: any) => {
  return `${REACT_APP_API_ASSETS_SERVER}/${values?.avatar?.fieldname}/${values?.avatar?.filename}`;
};

// @ts-ignore
export const getObjectUrl = (file: any) => {
  if (file) {
    const url = URL.createObjectURL(file);
    return url.toString();
  }
};

export const videoObjectUrl = (file) => {
  if (file) {
    console.log('URL.createObjectURL(file);', URL.createObjectURL(file));
      return URL.createObjectURL(file);
  }
  return null;
};

export function replaceSpacesWithHyphen(inputString) {
  // Use a regular expression to match one or more spaces and replace with a hyphen
  if (!inputString) return '';
  const resultString = inputString.replace(/\s+/g, '-');
  return resultString.toLowerCase();
}