import {TOP_LEFT_MENU_ICON_CLICK , LEFT_MENU_DISMISS, 
        ALAKI,UPDATE_SERVICES,UPDATE_USER_INFO} from "./action";

const defaultState = {
  lefMenuVisible:false,
  alaki:1,
  servicesList:[]
};

const shell = (state = defaultState, action) => {
  switch (action.type) {

      case TOP_LEFT_MENU_ICON_CLICK:
      return {
        ...state,
        lefMenuVisible: !state.lefMenuVisible
      };

      case LEFT_MENU_DISMISS:
      return {
        ...state,
        lefMenuVisible: false
      };

      case ALAKI:
      return {
        ...state,
        alaki: 5
      };

      case UPDATE_SERVICES:
      return {
        ...state,
        servicesList:action.servicesList
      };

      case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo:action.userInfo
      };
    
    default:
      return state;
  }
};

export default shell;