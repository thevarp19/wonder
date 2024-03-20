import { combineReducers } from "redux";
import { adminRootReducer } from "./admin/reducers";
import { sellerRootReducer } from "./seller/reducers";

export const rootReducer = combineReducers({
    admin: adminRootReducer,
    seller: sellerRootReducer,
});
