import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { login, sellerRegister } from "./api";
import {
    LoginRequest,
    LoginResponse,
    SellerRegisterRequest,
    SellerRegisterResponse,
} from "./types";

export const loginMutation = (success: (data: LoginResponse) => void) => {
    const { message } = App.useApp();
    return useMutation<LoginResponse, void, LoginRequest>({
        async mutationFn(values) {
            const { data } = await login(values);
            return data;
        },
        onSuccess(data) {
            success(data);
            message.success("Success!");
        },
        onError() {
            message.error("Error!");
        },
    });
};

export const sellerRegisterMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    return useMutation<SellerRegisterResponse, void, SellerRegisterRequest>({
        async mutationFn(values) {
            const { data } = await sellerRegister(values);
            return data;
        },
        onSuccess() {
            message.success("Success!");
            navigate("/seller/login");
        },
        onError() {
            message.error("Error!");
        },
    });
};
