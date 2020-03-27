import { combineReducers } from "redux";

import { dataReducer as adminDataReducer } from "./admin/reducers/dataReducer";
import { dataReducer as userReducer } from "./user/dataReducer";

export const rootReducer = combineReducers({
  admin: adminDataReducer,
  user: userReducer
});
