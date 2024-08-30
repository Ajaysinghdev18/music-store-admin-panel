import * as types from '../actionTypes';

const initialState = {
  users: <any>[],
  loading: false
};

const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case types.GET_USERS_FAIL:
      return {
        ...state,
        loading: false
      };
    case types.UPDATE_USER_SUCCESS: {
      const findIndex = state.users.findIndex((user) => user?._id == action.payload._id);
      state.users[findIndex] = action.payload;
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
