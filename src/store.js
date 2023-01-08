import { userLoginReducer, userRegisterReducer } from "./reducers/loginReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  logUser: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default rootReducers;
