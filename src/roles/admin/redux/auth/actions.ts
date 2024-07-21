import jwtService from "@/lib/jwt";
import { getRoles } from "@/lib/jwt/decode";
import { LoginResponse } from "@/modules/auth/types";
import { LOGIN_SUCCESS, LoginSuccessAction, LogoutAction } from "./types";

export const adminLoginSuccess = (data: LoginResponse): LoginSuccessAction => {
    jwtService.saveJwt({
        access: data.access,
        refresh: data.refresh,
    });
    if (!getRoles()?.includes("admin")) {
        throw new Error("Недопустимая роль. Ожидалась роль admin");
    }
    return {
        type: LOGIN_SUCCESS,
    };
};

export const adminLogout = (): LogoutAction => {
    jwtService.removeJwt();
    return { type: "LOGOUT" };
};
