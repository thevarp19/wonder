import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { cancelOrderAdmin, orderStatus } from "./api";
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

export const cancelOrderMutation = (orderId: number) => {
    const { message } = App.useApp();
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
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
