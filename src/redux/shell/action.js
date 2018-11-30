export const TOP_LEFT_MENU_ICON_CLICK = "TOP_LEFT_MENU_ICON_CLICK";
export const LEFT_MENU_DISMISS = "LEFT_MENU_DISMISS";
export const UPDATE_SERVICES = "UPDATE_SERVICES";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";


export const ALAKI = "ALAKI";

export const topLeftMenuIconClick = () => ({
    type: TOP_LEFT_MENU_ICON_CLICK
});

export const leftMenuDismmiss = () => ({
    type: LEFT_MENU_DISMISS
});


export const alakiAction = () => ({
  type: ALAKI
});

export const updateServices = (servicesList) => ({
  type: UPDATE_SERVICES,
  servicesList:servicesList
});

export const updateUserInfo = (userInfo) => ({
  type: UPDATE_USER_INFO,
  userInfo:userInfo
});