import { combineReducers } from "redux";
import { employeeAuthReducer } from "./auth/reducer";
import { scanReducer } from "./scan/reducer";

export const employeeRootReducer = combineReducers({
    auth: employeeAuthReducer,
    scan: scanReducer,
});
