import jwtService from "@/lib/jwt";
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
            try {
                success(data);
                message.success("Успешно!");
            } catch (error: any) {
                jwtService.removeJwt();
                message.error(error.message || "Произошла ошибка");
            }
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
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
            message.success("Успешно!");
            navigate("/login");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
