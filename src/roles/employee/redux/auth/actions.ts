import jwtService from "@/lib/jwt";
import { LoginResponse } from "@/modules/auth/types";
import { LOGIN_SUCCESS, LoginSuccessAction, LogoutAction } from "./types";

export const employeeLoginSuccess = (
    data: LoginResponse
): LoginSuccessAction => {
    jwtService.saveJwt({
        access: data.accessToken,
        refresh: data.refreshToken,
    });
    return {
        type: LOGIN_SUCCESS,
    };
};

export const employeeLogout = (): LogoutAction => {
    jwtService.removeJwt();
    return { type: "LOGOUT" };
};
