import { combineReducers } from "redux";
import { sellerAuthReducer } from "./auth/reducer";
import { sellerSupplyReducer } from "./supply/reducer";

export const sellerRootReducer = combineReducers({
    auth: sellerAuthReducer,
    supply: sellerSupplyReducer,
});
