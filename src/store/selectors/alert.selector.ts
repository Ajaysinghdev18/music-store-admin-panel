import { AlertRootState } from '../../shared/types';

export const getAlert = (state: AlertRootState) => state.alertReducer.alert;
