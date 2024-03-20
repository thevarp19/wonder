export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: {
        userData: { email: string };
    };
}

export const LOGOUT = "LOGOUT";
export interface LogoutAction {
    type: typeof LOGOUT;
}

export type SellerAuthActions = LoginSuccessAction | LogoutAction;
