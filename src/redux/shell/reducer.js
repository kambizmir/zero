import {TOP_LEFT_MENU_ICON_CLICK , LEFT_MENU_DISMISS, 
        UPDATE_SERVICES, UPDATE_INSTANCES,
        UPDATE_USER_INFO} from "./action";

const defaultState = {
  lefMenuVisible:false,
  servicesList:[],
  instancesList:[],
  userInfo:{},
  access_token:null,
  id_token:null,
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

      case UPDATE_SERVICES:
      return {
        ...state,
        servicesList:action.servicesList
      };

      case UPDATE_INSTANCES:
      return {
        ...state,
        instancesList:action.instancesList
      };

      case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo:action.userInfo,
        access_token:action.access_token,
        id_token:action.id_token
      };
    
    default:
      return state;
  }
};

export default shell;