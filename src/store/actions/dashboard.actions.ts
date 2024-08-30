import * as types from '../actionTypes';

export const setDashboardPeriod = (period) => {
  return {
    type: types.SET_DASHBOARD_PERIOD,
    payload: { period }
  };
};
