import * as types from '../actionTypes';

export const setFavTicketBtnClicked = (value: boolean) => {
  return {
    type: types.SET_TICKET_HEADER_FAV_BTN_CLICKED,
    payload: { clicked: value }
  };
};

export const setArchieveTicketBtnClicked = (value: boolean) => {
  return {
    type: types.SET_TICKET_HEADER_ARCHIEVE_BTN_CLICK,
    payload: { clicked: value }
  };
};

export const setDelTicketBtnClicked = (value: boolean) => {
  return {
    type: types.SET_TICKET_HEADER_DELETE_BTN_CLICK,
    payload: { clicked: value }
  };
};

export const setSearchExp = (value: string) => {
  return {
    type: types.SET_SEARCH_INPUT,
    payload: { searchExp: value }
  };
};
