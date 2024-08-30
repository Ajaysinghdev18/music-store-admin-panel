import * as types from '../actionTypes';

const initialState = {
  period: '30d'
};

const dashboardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.SET_DASHBOARD_PERIOD:
      return {
        ...state,
        period: action.payload.period
      };

    default:
      return state;
  }
};

export default dashboardReducer;
