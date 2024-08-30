import * as types from '../actionTypes';

export const getUsersAction = (users) => {
  return {
    type: types.GET_USERS_SUCCESS,
    payload: users
  };
};

export const updateUserAction = (object) => {
  return {
    type: types.UPDATE_USER_SUCCESS,
    payload: object.data
  };
};
