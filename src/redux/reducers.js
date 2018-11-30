import { combineReducers } from "redux";

import shellReducer from "./shell/reducer";


const reducers = combineReducers({
  shell: shellReducer
});

export default reducers;