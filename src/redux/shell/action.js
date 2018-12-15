export const TOP_LEFT_MENU_ICON_CLICK = "TOP_LEFT_MENU_ICON_CLICK";
export const LEFT_MENU_DISMISS = "LEFT_MENU_DISMISS";
export const UPDATE_SERVICES = "UPDATE_SERVICES";
export const UPDATE_INSTANCES = "UPDATE_INSTANCES";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const DRAWER_EXPAND_CHANGE = "DRAWER_EXPAND_CHANGE";
export const DRAWER_SWITCH_CLICK = "DRAWER_SWITCH_CLICK";



export const topLeftMenuIconClick = () => ({
    type: TOP_LEFT_MENU_ICON_CLICK
});

export const leftMenuDismmiss = () => ({
    type: LEFT_MENU_DISMISS
});

export const updateServices = (servicesList) => ({
  type: UPDATE_SERVICES,
  servicesList:servicesList
});

export const updateInstances = (instancesList) => ({
  type: UPDATE_INSTANCES,
  instancesList:instancesList
});

export const updateUserInfo = (userInfo, acces_token, id_token) => ({
  type: UPDATE_USER_INFO,
  userInfo:userInfo,
  access_token:acces_token,
  id_token:id_token
});

export const updateDrawerExpand = (item) => ({
  type: DRAWER_EXPAND_CHANGE,
  item:item
});

export const changeDrawerSwitchState = (item) => ({
  type: DRAWER_SWITCH_CLICK,
  item:item
});
