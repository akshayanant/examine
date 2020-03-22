import { combineReducers } from "redux";

import { dataReducer as adminDataReducer } from "./admin/reducers/dataReducer";

export const rootReducer = combineReducers({
  admin: adminDataReducer
});
