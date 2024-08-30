import * as types from '../actionTypes';

export const setAccount = (value: object | null) => {
  return {
    type: types.SET_ACCOUNT,
    payload: value
  };
};
