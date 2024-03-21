import { combineReducers } from "redux";
import { adminRootReducer } from "../modules/admin/redux/reducers";
import { sellerRootReducer } from "../modules/seller/redux/reducers";

export const rootReducer = combineReducers({
    admin: adminRootReducer,
    seller: sellerRootReducer,
});
