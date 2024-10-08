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
        access: data.access,
        refresh: data.refresh,
    });
    if (!getRoles()?.includes("seller")) {
        throw new Error("Недопустимая роль. Ожидалась роль seller");
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
