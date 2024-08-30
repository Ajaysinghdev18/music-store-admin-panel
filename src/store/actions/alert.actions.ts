import { IAlert } from '../../components';
import * as types from '../actionTypes';

export const setAlert = (alert: IAlert) => {
  return {
    type: types.SET_ALERT,
    payload: { alert }
  };
};

export const removeAlert = () => {
  return {
    type: types.REMOVE_ALERT
  };
};
