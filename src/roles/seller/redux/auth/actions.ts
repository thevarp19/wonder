import jwtService from "@/lib/jwt";
import { getRoles } from "@/lib/jwt/decode";
import {
    LOGIN_SUCCESS,
    LOGOUT,
    LoginSuccessAction,
    LogoutAction,
} from "./types";

export const sellerLoginSuccess = (): LoginSuccessAction => {
    if (!getRoles()?.includes("SELLER")) {
        throw new Error("Invalid role");
    }
    return {
        type: LOGIN_SUCCESS,
    };
};

export const sellerLogout = (): LogoutAction => {
    jwtService.removeJwt();
    return { type: LOGOUT };
};
