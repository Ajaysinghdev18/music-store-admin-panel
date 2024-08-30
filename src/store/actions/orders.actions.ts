import * as types from '../actionTypes';

export const geOrdersAction = (orders) => {
  return {
    type: types.GET_ORDERS_SUCCESS,
    payload: orders
  };
};
