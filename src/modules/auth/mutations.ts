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
            const errorMessage =
                error?.response?.data?.message ||
                error.message ||
                "Произошла ошибка";
            message.error(errorMessage);
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
            navigate("/seller/login");
        },
        onError(error) {
            const errorMessage =
                error?.response?.data?.message ||
                Object.values(error?.response?.data || {})
                    .flat()
                    .join(", ") ||
                "Произошла ошибка";
            message.error(errorMessage);
        },
    });
};
