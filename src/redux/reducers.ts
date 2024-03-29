import { combineReducers } from "redux";
import { adminRootReducer } from "../roles/admin/redux/reducers";
import { sellerRootReducer } from "../roles/seller/redux/reducers";

export const rootReducer = combineReducers({
    admin: adminRootReducer,
    seller: sellerRootReducer,
});
