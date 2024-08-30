import * as types from '../actionTypes';

const initialState = {
  orders: [],
  loading: false
};

const ordersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case types.GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default ordersReducer;
