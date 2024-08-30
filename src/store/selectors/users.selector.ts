import { UserRootState } from '../../shared/types';

export const getUsersSelector = (state: UserRootState) => state.usersReducer.users;
