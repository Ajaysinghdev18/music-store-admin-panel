import * as types from '../actionTypes';

const initialState = {
  account: null
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
