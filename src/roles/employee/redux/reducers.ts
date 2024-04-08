import { combineReducers } from "redux";
import { employeeAuthReducer } from "./auth/reducer";

export const employeeRootReducer = combineReducers({
    auth: employeeAuthReducer,
});
