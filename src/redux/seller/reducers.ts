import { combineReducers } from "redux";
import { sellerAuthReducer } from "./auth/reducer";

export const sellerRootReducer = combineReducers({
    auth: sellerAuthReducer,
});
