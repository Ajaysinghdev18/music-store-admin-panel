import axios, { AxiosRequestConfig, Method } from 'axios';

import { ACCESS_TOKEN_KEY, API_SERVER } from '../constants';
import { StorageHelper } from '../helpers';

const http = axios.create({ baseURL: `${API_SERVER}/api/v1` });
const httpV2 = axios.create({ baseURL: `${API_SERVER}/api/v2` });

const requestV1 = (method: Method, url: string, options: AxiosRequestConfig) => {
  const accessToken = StorageHelper.getItem(ACCESS_TOKEN_KEY);

  return http
    .request({
      ...options,
      method,
      url,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(httpResponseHandler)
    .catch(httpErrorHandler);
};
const requestV2 = (method: Method, url: string, options: AxiosRequestConfig) => {
  const accessToken = StorageHelper.getItem(ACCESS_TOKEN_KEY);

  return httpV2
    .request({
      ...options,
      method,
      url,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(httpResponseHandler)
    .catch(httpErrorHandler);
};
// @ts-ignore
const httpResponseHandler = (response: any) => {
  return response.data;
};

// @ts-ignore
const httpErrorHandler = (err: any) => {
  const response = err?.response;
  if (response?.status === 401) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: 'Unauthorized'
    };
  }
  if (response?.status === 404) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: 'User Not Found'
    };
  }

  const data = response?.data;
  // eslint-disable-next-line no-throw-literal
  throw {
    msg: data?.msg || 'Network Error!'
  };
};

const Http = {
  // @ts-ignore
  get(url: string, params: any = {}, headers: any = {}) {
    return requestV1('GET', url, { params, headers });
  },
  // @ts-ignore
  post(url: string, body: any = {}, headers: any = {}) {
    return requestV1('POST', url, { data: body, headers });
  },
  // @ts-ignore
  put(url: string, body: any = {}, headers: any = {}) {
    return requestV1('PUT', url, { data: body, headers });
  },
  // @ts-ignore
  patch(url: string, body: any = {}, headers: any = {}) {
    return requestV1('PATCH', url, { data: body, headers });
  },
  // @ts-ignore
  delete(url: string, body: any = {}, headers: any = {}) {
    return requestV1('DELETE', url, { data: body, headers });
  }
};

export const HttpV2 = {
  // @ts-ignore
  get(url: string, params: any = {}, headers: any = {}) {
    return requestV2('GET', url, { params, headers });
  },
  // @ts-ignore
  post(url: string, body: any = {}, headers: any = {}) {
    return requestV2('POST', url, { data: body, headers });
  },
  // @ts-ignore
  put(url: string, body: any = {}, headers: any = {}) {
    return requestV2('PUT', url, { data: body, headers });
  },
  // @ts-ignore
  patch(url: string, body: any = {}, headers: any = {}) {
    return requestV2('PATCH', url, { data: body, headers });
  },
  // @ts-ignore
  delete(url: string, body: any = {}, headers: any = {}) {
    return requestV2('DELETE', url, { data: body, headers });
  }
};

export default Http;
