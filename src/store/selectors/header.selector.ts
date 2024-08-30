import { HeaderRootState } from '../../shared/types';

export const getFavBtnClicked = (state: HeaderRootState) => state.headerReducer.favBtnClicked;
export const getArchieveBtnClicked = (state: HeaderRootState) => state.headerReducer.archieveBtnClicked;
export const getDelBtnClicked = (state: HeaderRootState) => state.headerReducer.delBtnClicked;
export const getSearchExp = (state: HeaderRootState) => state.headerReducer.searchExp;
