import jwtService from "@/lib/jwt";
import { getUserData, isJwtExpired } from "@/lib/jwt/decode";
import * as actionTypes from "./types";

const INITIAL_STATE = {
    isLoggedIn: !!(jwtService.getAccessToken() && !isJwtExpired()),
    userData: getUserData(),
};

export const employeeAuthReducer = (
    state = INITIAL_STATE,
    action: actionTypes.EmployeeAuthActions
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
