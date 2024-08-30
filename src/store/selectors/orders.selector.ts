import { OrderRootState } from '../../shared/types';

export const getOrdersSelector = (state: OrderRootState) => state.ordersReducer.orders;
