import * as types from '../actionTypes';

const initialState = {
  favBtnClicked: false,
  archieveBtnClicked: false,
  delBtnClicked: false,
  searchExp: ''
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TICKET_HEADER_FAV_BTN_CLICKED: {
      return {
        ...state,
        favBtnClicked: action.payload.clicked
      };
    }
    case types.SET_TICKET_HEADER_ARCHIEVE_BTN_CLICK: {
      return {
        ...state,
        archieveBtnClicked: action.payload.clicked
      };
    }
    case types.SET_TICKET_HEADER_DELETE_BTN_CLICK: {
      return {
        ...state,
        delBtnClicked: action.payload.clicked
      };
    }
    case types.SET_SEARCH_INPUT: {
      return {
        ...state,
        searchExp: action.payload.searchExp
      };
    }
    default:
      return state;
  }
};

export default headerReducer;
