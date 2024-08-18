import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
    cancelOrderAdmin,
    orderCodeConfirm,
    orderCodeRequest,
    orderStatus,
} from "./api";
import { ProductStatusChangeRequest } from "./types";

export const orderStatusMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, ProductStatusChangeRequest[]>({
        async mutationFn(values) {
            await orderStatus(values);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`orders-employee-assemble`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-employee-package`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-employee-transfer`],
            });
        },
        onError(error) {
            message.error(`${error?.response}`);
        },
    });
};

export const cancelOrderMutation = (
    orderId: string,
    role: "admin" | "seller"
) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, any>({
        async mutationFn(values) {
            await cancelOrderAdmin(orderId, values);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`orders-employee`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-admin`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-seller`],
            });
            navigate(`/${role}/orders`);
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const orderCodeRequestMutation = (orderId: string) => {
    const { message } = App.useApp();
    return useMutation<void, AxiosError<any>, void>({
        async mutationFn() {
            await orderCodeRequest(orderId);
        },
        onSuccess() {
            message.success("На ваш каспи отправлен код!");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const orderCodeConfirmMutation = (orderId: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, { code: string }>({
        async mutationFn(values: { code: string }) {
            await orderCodeConfirm(orderId, values.code); // Ensure the function handles the code properly.
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`order-detail-employee`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
