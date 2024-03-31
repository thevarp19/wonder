import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
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
    return useMutation<LoginResponse, AxiosError<any>, LoginRequest>({
        async mutationFn(values) {
            const { data } = await login(values);
            return data;
        },
        onSuccess(data) {
            success(data);
            message.success("Success!");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const sellerRegisterMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    return useMutation<
        SellerRegisterResponse,
        AxiosError<any>,
        SellerRegisterRequest
    >({
        async mutationFn(values) {
            const { data } = await sellerRegister(values);
            return data;
        },
        onSuccess() {
            message.success("Success!");
            navigate("/seller/login");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
