import jwtService from "@/lib/jwt";
import { getRoles } from "@/lib/jwt/decode";
import { myLocalStorage } from "@/lib/storage/browserStorage";
import {
    LOGIN_SUCCESS,
    LOGOUT,
    LoginSuccessAction,
    LogoutAction,
} from "./types";

export const sellerLoginSuccess = (email: string): LoginSuccessAction => {
    myLocalStorage?.set("userEmail", email);
    if (!getRoles()?.includes("SELLER")) {
        throw new Error("Invalid role");
    }
    return {
        type: LOGIN_SUCCESS,
        payload: {
            userData: { email },
        },
    };
};

export const sellerLogout = (): LogoutAction => {
    jwtService.removeJwt();
    return { type: LOGOUT };
};
