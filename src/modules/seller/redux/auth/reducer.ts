import jwtService from "@/lib/jwt";
import { getRoles, isJwtExpired } from "@/lib/jwt/decode";
import { myLocalStorage } from "@/lib/storage/browserStorage";
import { LOGIN_SUCCESS, LOGOUT, SellerAuthActions } from "./types";

const INITIAL_STATE = {
    isLoggedIn: !!(
        jwtService.getAccessToken() &&
        !isJwtExpired() &&
        getRoles()?.includes("SELLER")
    ),
    userData: {
        email: myLocalStorage?.get("userEmail") || "",
    },
};

export const sellerAuthReducer = (
    state = INITIAL_STATE,
    action: SellerAuthActions
): typeof INITIAL_STATE => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.payload.userData,
                isLoggedIn: true,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};
