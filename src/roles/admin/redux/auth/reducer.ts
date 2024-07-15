import jwtService from "@/lib/jwt";
import { getRoles, getUserData, isJwtExpired } from "@/lib/jwt/decode";
import * as actionTypes from "./types";

const INITIAL_STATE = {
    isLoggedIn: !!(
        jwtService.getAccessToken() &&
        !isJwtExpired() &&
        getRoles()?.includes("admin")
    ),
    userData: getUserData(),
};

export const adminAuthReducer = (
    state = INITIAL_STATE,
    action: actionTypes.AdminAuthActions
): typeof INITIAL_STATE => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                userData: getUserData(),
                isLoggedIn: true,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                userData: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};
