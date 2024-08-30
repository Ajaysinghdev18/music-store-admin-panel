import { DashboardRootState } from '../../shared/types';

export const getDashboardPeriod = (state: DashboardRootState) => state.dashboardReducer.period;
