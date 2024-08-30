import { IAlertsState } from './alert.interface';
import { IAuthState } from './auth.interface';
import { IDashboardState } from './dashboard.interface';
import { IHeaderState } from './header.interface';
import { IOrderState } from './orders.interface';
import { IUserState } from './users.interface';

export interface IRootState {
  authReducer: IAuthState;
}

export interface UserRootState {
  usersReducer: IUserState;
}

export interface OrderRootState {
  ordersReducer: IOrderState;
}

export interface DashboardRootState {
  dashboardReducer: IDashboardState;
}

export interface HeaderRootState {
  headerReducer: IHeaderState;
}

export interface AlertRootState {
  alertReducer: IAlertsState;
}
