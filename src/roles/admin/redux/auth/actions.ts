import jwtService from "@/lib/jwt";
import { getRoles } from "@/lib/jwt/decode";
import { LOGIN_SUCCESS, LoginSuccessAction, LogoutAction } from "./types";

export const adminLoginSuccess = (): LoginSuccessAction => {
    if (!getRoles()?.includes("SUPER_ADMIN")) {
        throw new Error("Invalid role");
    }
    return {
        type: LOGIN_SUCCESS,
    };
};

export const adminLogout = (): LogoutAction => {
    jwtService.removeJwt();
    return { type: "LOGOUT" };
};
