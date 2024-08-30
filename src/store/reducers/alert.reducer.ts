import { IAlertsState } from '../../shared/types';
import * as types from '../actionTypes';

const initialState: IAlertsState = {
  alert: undefined
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALERT: {
      return {
        ...state,
        alert: action.payload.alert
      };
    }

    case types.REMOVE_ALERT: {
      return {
        ...state,
        alert: undefined
      };
    }

    default:
      return state;
  }
};

export default alertReducer;
