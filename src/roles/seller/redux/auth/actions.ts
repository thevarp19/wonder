import jwtService from "@/lib/jwt";
import { getRoles } from "@/lib/jwt/decode";
import { myLocalStorage } from "@/lib/storage/browserStorage";
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
    myLocalStorage?.remove("supply-products");
    myLocalStorage?.remove("supply-packs");
    myLocalStorage?.remove("supply-store");
    myLocalStorage?.remove("supply-date");
    return { type: LOGOUT };
};
