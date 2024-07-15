import jwtService from "@/lib/jwt";
import { getRoles, getUserData, isJwtExpired } from "@/lib/jwt/decode";
import { LOGIN_SUCCESS, LOGOUT, SellerAuthActions } from "./types";

const INITIAL_STATE = {
    isLoggedIn: !!(
        jwtService.getAccessToken() &&
        !isJwtExpired() &&
        getRoles()?.includes("seller")
    ),
    userData: getUserData(),
};

export const sellerAuthReducer = (
    state = INITIAL_STATE,
    action: SellerAuthActions
): typeof INITIAL_STATE => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                userData: getUserData(),
                isLoggedIn: true,
            };
        case LOGOUT:
            return {
                ...state,
                userData: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};
