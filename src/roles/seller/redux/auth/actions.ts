import jwtService from "@/lib/jwt";
import { getRoles } from "@/lib/jwt/decode";
import { LoginResponse } from "@/modules/auth/types";
import {
    LOGIN_SUCCESS,
    LOGOUT,
    LoginSuccessAction,
    LogoutAction,
} from "./types";

export const sellerLoginSuccess = (data: LoginResponse): LoginSuccessAction => {
    jwtService.saveJwt({
        access: data.accessToken,
        refresh: data.refreshToken,
    });
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
