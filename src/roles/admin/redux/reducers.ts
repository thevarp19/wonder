import { combineReducers } from "redux";
import { adminAuthReducer } from "./auth/reducer";

export const adminRootReducer = combineReducers({
    auth: adminAuthReducer,
});
