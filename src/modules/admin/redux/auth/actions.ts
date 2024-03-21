import jwtService from "@/lib/jwt";
import { getRoles } from "@/lib/jwt/decode";
import { myLocalStorage } from "@/lib/storage/browserStorage";
import { LOGIN_SUCCESS, LoginSuccessAction, LogoutAction } from "./types";

export const adminLoginSuccess = (email: string): LoginSuccessAction => {
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

export const adminLogout = (): LogoutAction => {
    jwtService.removeJwt();
    return { type: "LOGOUT" };
};
