import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import bannerReducer from "./banner/bannerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  banner: bannerReducer,
  auth: authReducer,
});

export default rootReducer;
