import jwtService from "@/lib/jwt";
import { getRoles, isJwtExpired } from "@/lib/jwt/decode";
import { myLocalStorage } from "@/lib/storage/browserStorage";
import * as actionTypes from "./types";

const INITIAL_STATE = {
    isLoggedIn: !!(
        jwtService.getAccessToken() &&
        !isJwtExpired() &&
        getRoles()?.includes("SUPER_ADMIN")
    ),
    userData: {
        email: myLocalStorage?.get("userEmail") || "",
    },
};

export const adminAuthReducer = (
    state = INITIAL_STATE,
    action: actionTypes.AdminAuthActions
): typeof INITIAL_STATE => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.payload.userData,
                isLoggedIn: true,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};
