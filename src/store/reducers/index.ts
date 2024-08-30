import { combineReducers } from 'redux';

import alertReducer from './alert.reducer';
import authReducer from './auth.reducer';
import dashboardReducer from './dashboard.reducer';
import headerReducer from './header.reducer';
import ordersReducer from './orders.reducer';
import usersReducer from './users.reducer';

export default combineReducers({
  authReducer,
  dashboardReducer,
  usersReducer,
  ordersReducer,
  headerReducer,
  alertReducer
});
