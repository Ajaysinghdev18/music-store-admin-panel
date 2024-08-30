import { IRootState } from '../../shared/types';

export const getAccount = (state: IRootState) => state.authReducer.account;
